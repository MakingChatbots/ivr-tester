import WebSocket from "ws";
import waitForExpect from "wait-for-expect";
import { EventEmitter } from "events";
import { CallHandlingServerStartedEvent } from "./events/setupEvents";
import {
  CallHandlingServer,
  ServerConfig,
  startServerListening,
} from "../server";
import { StopWhenAllTestsComplete } from "./StopWhenAllTestsComplete";
import { waitForConnection } from "../server.spec";
import getPort from "get-port";

// export const waitForConnection = async (ws: ws) =>
//   new Promise((resolve) => ws.on("open", resolve));
//
// export const createMockDtmfGenerator = (): jest.Mocked<
//   DtmfBufferGenerator
// > => ({ generate: jest.fn() });
//
// class TranscriberTestDouble extends EventEmitter implements Transcriber {
//   public close(): void {}
//   public transcribe(payload: any): void {}
//
//   public produceTranscriptionEvent(transcription: string) {
//     const event: TranscriptEvent = { transcription };
//     this.emit("transcription", event);
//   }
// }
//
// export const createMockTranscriber = (): jest.Mocked<Transcriber> => ({
//   addListener: jest.fn(),
//   eventNames: jest.fn(),
//   getMaxListeners: jest.fn(),
//   listenerCount: jest.fn(),
//   listeners: jest.fn(),
//   off: jest.fn(),
//   once: jest.fn(),
//   prependListener: jest.fn(),
//   prependOnceListener: jest.fn(),
//   rawListeners: jest.fn(),
//   removeAllListeners: jest.fn(),
//   removeListener: jest.fn(),
//   setMaxListeners: jest.fn(),
//   transcribe: jest.fn(),
//   emit: jest.fn(),
//   on: jest.fn(),
//   close: jest.fn(),
// });

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
    const emitter = new EventEmitter();

    const stopWhenAllTestsComplete = new StopWhenAllTestsComplete();
    stopWhenAllTestsComplete.initialise(emitter);

    const config: ServerConfig = {
      localServerPort: await getPort(),
    };

    server = await startServerListening(config, [], emitter);

    const event: CallHandlingServerStartedEvent = { server: server.wss };
    emitter.emit("callHandlingServerStarted", event);

    ws = new WebSocket(`ws://localhost:${config.localServerPort}/`);
    await waitForConnection(ws);

    emitter.emit("ivrTestPassed");

    await waitForExpect(() => {
      expect(ws.readyState).toBe(ws.CLOSED);
    });
  });
});
