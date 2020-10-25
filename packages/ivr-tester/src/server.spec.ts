import WebSocket from "ws";
import ws from "ws";
import waitForExpect from "wait-for-expect";
import {
  CallHandlingServer,
  ServerConfig,
  startServerListening,
} from "./server";
import { IvrTest } from "./handlers/TestHandler";
import { Transcriber, TranscriptEvent } from "./transcribers/Transcriber";
import { DtmfBufferGenerator } from "./dtmf/DtmfPlayer";
import { EventEmitter } from "events";
import { AddressInfo } from "net";
import { ordered } from "./handlers/ordered";
import getPort from "get-port";
import { TestLifecycleEventEmitter } from "./plugins/events/eventEmitter";

export const waitForConnection = async (ws: ws) =>
  new Promise((resolve) => ws.on("open", resolve));

export const createMockDtmfGenerator = (): jest.Mocked<
  DtmfBufferGenerator
> => ({ generate: jest.fn() });

class TranscriberTestDouble extends EventEmitter implements Transcriber {
  public close(): void {}
  public transcribe(payload: any): void {}

  public produceTranscriptionEvent(transcription: string) {
    const event: TranscriptEvent = { transcription };
    this.emit("transcription", event);
  }
}

export const createMockTranscriber = (): jest.Mocked<Transcriber> => ({
  addListener: jest.fn(),
  eventNames: jest.fn(),
  getMaxListeners: jest.fn(),
  listenerCount: jest.fn(),
  listeners: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  prependListener: jest.fn(),
  prependOnceListener: jest.fn(),
  rawListeners: jest.fn(),
  removeAllListeners: jest.fn(),
  removeListener: jest.fn(),
  setMaxListeners: jest.fn(),
  transcribe: jest.fn(),
  emit: jest.fn(),
  on: jest.fn(),
  close: jest.fn(),
});

const fiveSeconds = 5 * 1000;
jest.setTimeout(fiveSeconds);

describe("server", () => {
  let server: CallHandlingServer;
  let ws: WebSocket;

  afterAll((done) => {
    if (server) {
      server.wss.close(done);
    }
  });

  test("recipient's audio transcribed for test then server shutdown", async () => {
    const transcriber = new TranscriberTestDouble();

    const config: ServerConfig = {
      localServerPort: await getPort(),
      dtmfGenerator: createMockDtmfGenerator(),
      transcriber: () => transcriber,
    };
    const test: IvrTest = {
      name: "",
      test: ordered([]),
    };

    const emitter: jest.Mocked<TestLifecycleEventEmitter> = {
      emit: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
    };

    server = await startServerListening(config, [test], emitter);
    const { port } = server.wss.address() as AddressInfo;

    ws = new WebSocket(`ws://localhost:${port}/`);
    await waitForConnection(ws);

    jest.spyOn(transcriber, "transcribe").mockImplementation(() => {
      transcriber.produceTranscriptionEvent("hello world");
    });

    const callMediaPayload = "base-64-encoded-payload";
    ws.send(
      JSON.stringify({
        event: "media",
        media: {
          payload: callMediaPayload,
        },
      })
    );

    await waitForExpect(() => {
      expect(transcriber.transcribe).toBeCalledWith(callMediaPayload);
      expect(emitter.emit).toHaveBeenCalledWith(
        "ivrTestPassed",
        expect.any(Object)
      );
    });
  });
});
