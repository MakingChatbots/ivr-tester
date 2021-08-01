import { StopTestRunnerWhenTestsComplete } from "./StopTestRunnerWhenTestsComplete";
import {
  IvrTesterLifecycle,
  IvrTesterLifecycle,
} from "../../../plugins/PluginManager";
import { TypedEmitter } from "../../../Emitter";
import { IvrTester, TestSession } from "../../../IvrTester";
import {
  CallFlowTestSession,
  CallFlowSessionEvents,
} from "./test/CallFlowTest";

class StubCallFlowSession
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowTestSession {}

class StubPluginManager
  extends TypedEmitter<IvrTesterLifecycle>
  implements IvrTesterLifecycle {
  abortTests(): void {
    // Intentionally empty
  }
}

describe("Close server when tests complete", () => {
  let pluginHost: IvrTesterLifecycle;
  let testRunner: jest.Mocked<IvrTester>;

  beforeEach(() => {
    pluginHost = new StubPluginManager();
    testRunner = {
      stop: jest.fn(),
    };
  });

  test("test runner stopped when all test sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginHost, testRunner);

    const callFlowSession = new StubCallFlowSession();
    const testSession: TestSession = {
      scenario: undefined,
      call: undefined,
      callFlowTestSession: callFlowSession,
    };

    stopWhenAllTestsComplete.testStarted(testSession);

    callFlowSession.emit("allPromptsMatched", {
      transcription: "",
    });

    expect(testRunner.stop).toHaveBeenCalledWith(false);
  });

  test("test runner stopped with failure if any test sessions have timed-out", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginHost, testRunner);

    const testSession1: TestSession = {
      scenario: undefined,
      call: undefined,
      callFlowTestSession: new StubCallFlowSession(),
    };
    const testSession2: TestSession = {
      scenario: undefined,
      call: undefined,
      callFlowTestSession: new StubCallFlowSession(),
    };

    stopWhenAllTestsComplete.testStarted(testSession1);
    stopWhenAllTestsComplete.testStarted(testSession2);

    testSession1.callFlowTestSession.emit("allPromptsMatched", {});
    testSession2.callFlowTestSession.emit("timeoutWaitingForMatch", {
      transcription: "",
    });

    const failure = true;
    expect(testRunner.stop).toHaveBeenCalledWith(failure);
  });

  test("test runner not stopped until all test sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginHost, testRunner);

    const testSession1: TestSession = {
      scenario: undefined,
      call: undefined,
      callFlowTestSession: new StubCallFlowSession(),
    };
    const testSession2: TestSession = {
      scenario: undefined,
      call: undefined,
      callFlowTestSession: new StubCallFlowSession(),
    };

    stopWhenAllTestsComplete.testStarted(testSession1);
    stopWhenAllTestsComplete.testStarted(testSession2);

    testSession1.callFlowTestSession.emit("allPromptsMatched", {});

    expect(testRunner.stop).not.toHaveBeenCalled();
  });
});
