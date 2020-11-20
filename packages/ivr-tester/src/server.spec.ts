import WebSocket from "ws";
import ws from "ws";
import waitForExpect from "wait-for-expect";
import {
  CallHandlingServer,
  ServerConfig,
  startServerListening,
} from "./server";
import { IvrTest } from "./handlers/TestHandler";
import { DtmfBufferGenerator } from "./dtmf/DtmfPlayer";
import { EventEmitter } from "events";
import { AddressInfo } from "net";
import { inOrder } from "./handlers/inOrder";
import getPort from "get-port";
import { TestEventEmitter } from "./plugins/lifecycle/LifecycleEventEmitter";
import {
  TranscriberPlugin,
  TranscriptEvent,
} from "./plugins/transcription/TranscriberPlugin";

export const waitForConnection = async (ws: ws): Promise<void> =>
  new Promise((resolve) => ws.on("open", resolve));

export const createMockDtmfGenerator = (): jest.Mocked<
  DtmfBufferGenerator
> => ({ generate: jest.fn() });

class TranscriberTestDouble extends EventEmitter implements TranscriberPlugin {
  public close(): void {
    // Intentionally empty
  }
  public transcribe(): void {
    // Intentionally empty
  }

  public produceTranscriptionEvent(transcription: string) {
    const event: TranscriptEvent = { transcription, isFinal: true };
    this.emit("transcription", event);
  }
}

export const createMockTranscriber = (): jest.Mocked<TranscriberPlugin> => ({
  off: jest.fn(),
  emit: jest.fn(),
  on: jest.fn(),
  transcribe: jest.fn(),
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

  test("recipient's audio transcribed for test", async () => {
    const transcriber = new TranscriberTestDouble();

    const config: ServerConfig = {
      localServerPort: await getPort(),
      dtmfGenerator: createMockDtmfGenerator(),
      transcriber: () => transcriber,
    };
    const test: IvrTest = {
      name: "",
      test: inOrder([]),
    };

    const emitter: jest.Mocked<TestEventEmitter> = {
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

    const callMediaPayload = Buffer.from([0, 1, 2, 3]).toString("base64");
    ws.send(
      JSON.stringify({
        event: "media",
        media: {
          payload: callMediaPayload,
        },
      })
    );

    await waitForExpect(() => {
      expect(transcriber.transcribe).toBeCalledWith(Buffer.from([0, 1, 2, 3]));
      expect(emitter.emit).toHaveBeenCalledWith(
        "ivrTestPassed",
        expect.any(Object)
      );
    });
  });
});
