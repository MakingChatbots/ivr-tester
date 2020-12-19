import { CloseServerWhenTestsComplete } from "./CloseServerWhenTestsComplete";
import { Server } from "ws";
import {
  createLifecycleEventEmitter,
  LifecycleEventEmitter,
} from "../plugins/lifecycle/LifecycleEventEmitter";

describe("Close server when tests complete", () => {
  let lifecycleEmitter: LifecycleEventEmitter;
  let server: jest.Mocked<Pick<Server, "close">>;

  beforeEach(() => {
    lifecycleEmitter = createLifecycleEventEmitter();
    server = {
      close: jest.fn(),
    };
  });

  test("closes server when all tests succeed", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(lifecycleEmitter);

    lifecycleEmitter.emit("callHandlingServerStarted", {
      server: (server as unknown) as Server,
    });
    lifecycleEmitter.emit("callAssignedTest", { index: 0, test: undefined });
    lifecycleEmitter.emit("ivrTestPassed", { test: undefined });

    expect(server.close).toHaveBeenCalled();
  });

  test("closes server when all tests fail", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(lifecycleEmitter);

    lifecycleEmitter.emit("callHandlingServerStarted", {
      server: (server as unknown) as Server,
    });
    lifecycleEmitter.emit("callAssignedTest", { index: 0, test: undefined });
    lifecycleEmitter.emit("ivrTestFailed", {
      transcription: "",
      test: undefined,
    });

    expect(server.close).toHaveBeenCalled();
  });

  test("server not closed if all tests are not complete", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(lifecycleEmitter);

    lifecycleEmitter.emit("callHandlingServerStarted", {
      server: (server as unknown) as Server,
    });
    lifecycleEmitter.emit("callAssignedTest", { index: 0, test: undefined });
    lifecycleEmitter.emit("callAssignedTest", { index: 0, test: undefined });
    lifecycleEmitter.emit("ivrTestPassed", { test: undefined });

    expect(server.close).not.toHaveBeenCalled();
  });
});
