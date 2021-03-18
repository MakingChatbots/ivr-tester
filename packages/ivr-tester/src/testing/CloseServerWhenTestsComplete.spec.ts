import { CloseServerWhenTestsComplete } from "./CloseServerWhenTestsComplete";
import { PluginEvents } from "../plugins/PluginManager";
import { Emitter, TypedEmitter } from "../Emitter";
import {
  CallServer,
  CallServerEvents,
  TwilioCallServer,
} from "./TwilioCallServer";
import { URL } from "url";
import { Runner, TestSession } from "../testRunner";
import {
  CallFlowSession,
  CallFlowSessionEvents,
} from "./test/CallFlowTestDefinition";

class StubCallServer
  extends TypedEmitter<CallServerEvents>
  implements CallServer {
  listen(): Promise<URL> {
    return Promise.resolve(undefined);
  }

  stop(): void {
    // Intentionally empty
  }
}

class StubCallFlowSession
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowSession {}

describe("Close server when tests complete", () => {
  let pluginEmitter: Emitter<PluginEvents>;
  let callServer: CallServer;
  let testRunner: jest.Mocked<Runner>;

  beforeEach(() => {
    pluginEmitter = new TypedEmitter<PluginEvents>();
    callServer = new StubCallServer();
    testRunner = {
      stop: jest.fn(),
    };
  });

  test("server closed when all call-flow sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const callFlowSession = new StubCallFlowSession();
    const testSession: TestSession = {
      callFlowTestDefinition: undefined,
      call: undefined,
      callFlowSession,
    };

    callServer.emit("testStarted", { testSession });

    // jest.spyOn(callServer, "stop");
    callFlowSession.emit("allPromptsMatched", {
      transcription: "",
    });

    expect(testRunner.stop).toHaveBeenCalledWith(false);
  });

  test("server closed when all call-flow sessions have timed out", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const callFlowSession = new StubCallFlowSession();
    const testSession: TestSession = {
      callFlowTestDefinition: undefined,
      call: undefined,
      callFlowSession,
    };

    callServer.emit("testStarted", { testSession });

    // jest.spyOn(callServer, "stop");
    callFlowSession.emit("timeoutWaitingForMatch", {
      transcription: "",
    });

    expect(testRunner.stop).toHaveBeenCalledWith(true);
  });

  test("server not closed until all call-flow sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

    pluginEmitter.emit("callServerStarted", {
      callServer: (callServer as unknown) as TwilioCallServer,
    });

    const testSession1: TestSession = {
      callFlowTestDefinition: undefined,
      call: undefined,
      callFlowSession: new StubCallFlowSession(),
    };
    const testSession2: TestSession = {
      callFlowTestDefinition: undefined,
      call: undefined,
      callFlowSession: new StubCallFlowSession(),
    };

    callServer.emit("testStarted", { testSession: testSession1 });
    callServer.emit("testStarted", { testSession: testSession2 });

    // jest.spyOn(testRunner, "stop");
    testSession1.callFlowSession.emit("allPromptsMatched", {});

    expect(testRunner.stop).not.toHaveBeenCalled();
  });
});
