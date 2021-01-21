import { CloseServerWhenTestsComplete } from "./CloseServerWhenTestsComplete";
import { PluginEvents } from "../plugins/PluginManager";
import { Emitter, TypedEmitter } from "../Emitter";
import {
  CallHandlingServer,
  TwilioCallServer,
  CallServer,
  CallServerEvents,
} from "./TwilioCallServer";
import { Call } from "../call/Call";
import { TestInstance, TestInstanceEvents } from "./test/TestInstanceClass";
import { IvrTest } from "./test/IvrTest";

class StubCallServer
  extends TypedEmitter<CallServerEvents>
  implements CallServer {
  listen(): Promise<CallHandlingServer> {
    return Promise.resolve(undefined);
  }

  stop(): void {
    // Intentionally empty
  }

  // getEstablishedCalls(): ReadonlyArray<Call> {
  //   return undefined;
  // }
  //
  // preventNewCalls(): void {
  // }
}

class StubTestInstance
  extends TypedEmitter<TestInstanceEvents>
  implements TestInstance {
  getCall(): Call {
    throw new Error("Not Implemented");
  }

  getTest(): IvrTest {
    throw new Error("Not Implemented");
  }
}

describe("Close server when tests complete", () => {
  let pluginEmitter: Emitter<PluginEvents>;
  let callServer: CallServer;

  beforeEach(() => {
    pluginEmitter = new TypedEmitter<PluginEvents>();
    callServer = new StubCallServer();
  });

  test("closes server when all tests succeed", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const testInstance = new StubTestInstance();
    callServer.emit("testStarted", { testInstance });

    jest.spyOn(callServer, "stop");
    testInstance.emit("testPassed", { test: undefined });

    expect(callServer.stop).toHaveBeenCalled();
  });

  test("closes server when all tests fail", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const testInstance = new StubTestInstance();
    callServer.emit("testStarted", { testInstance });

    jest.spyOn(callServer, "stop");
    testInstance.emit("testFailed", {
      test: undefined,
      transcription: undefined,
    });

    expect(callServer.stop).toHaveBeenCalled();
  });

  test("server not closed if all tests are not complete", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const testInstance1 = new StubTestInstance();
    const testInstance2 = new StubTestInstance();
    callServer.emit("testStarted", { testInstance: testInstance1 });
    callServer.emit("testStarted", { testInstance: testInstance2 });

    jest.spyOn(callServer, "stop");
    testInstance1.emit("testPassed", { test: undefined });

    expect(callServer.stop).not.toHaveBeenCalled();
  });
});
