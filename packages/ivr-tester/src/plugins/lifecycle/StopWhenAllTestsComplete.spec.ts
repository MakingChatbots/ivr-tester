import waitForExpect from "wait-for-expect";
import {
  CallHandlingServer,
  ServerConfig,
  startServerListening,
} from "../../server";
import { StopWhenAllTestsComplete } from "./StopWhenAllTestsComplete";
import getPort from "get-port";
import { createLifecycleEventEmitter } from "./LifecycleEventEmitter";

describe("server", () => {
  let server: CallHandlingServer;
  let serverConfig: ServerConfig;

  beforeEach(async () => {
    serverConfig = { localServerPort: await getPort(), transcriber: jest.fn() };
  });

  afterAll((done) => {
    if (server) {
      server.wss.close(done);
    }
  });

  test("server is closed when test succeeds", async () => {
    const stopWhenAllTestsComplete = new StopWhenAllTestsComplete();
    const serverClosedCallback = jest.fn();

    const emitter = createLifecycleEventEmitter();

    server = await startServerListening(serverConfig, [], emitter);
    server.wss.on("close", serverClosedCallback);

    stopWhenAllTestsComplete.initialise(emitter);
    emitter.emit("callHandlingServerStarted", { server: server.wss });
    emitter.emit("ivrTestPassed", { test: undefined });

    await waitForExpect(() => {
      expect(serverClosedCallback).toBeCalled();
    });
  });

  test("server is closed when test fails", async () => {
    const stopWhenAllTestsComplete = new StopWhenAllTestsComplete();
    const serverClosedCallback = jest.fn();

    const emitter = createLifecycleEventEmitter();

    server = await startServerListening(serverConfig, [], emitter);
    server.wss.on("close", serverClosedCallback);

    stopWhenAllTestsComplete.initialise(emitter);
    emitter.emit("callHandlingServerStarted", { server: server.wss });
    emitter.emit("ivrTestFailed", { test: undefined, transcription: "" });

    await waitForExpect(() => {
      expect(serverClosedCallback).toBeCalled();
    });
  });
});
