import { StopTestRunnerWhenTestsComplete } from "./StopTestRunnerWhenTestsComplete";
import { PluginEvents } from "../plugins/PluginManager";
import { Emitter, TypedEmitter } from "../Emitter";
import { TestRunner, TestSession } from "../testRunner";
import {
  CallFlowSession,
  CallFlowSessionEvents,
} from "./test/CallFlowTestDefinition";

class StubCallFlowSession
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowSession {}

describe("Close server when tests complete", () => {
  let pluginEmitter: Emitter<PluginEvents>;
  let testRunner: jest.Mocked<TestRunner>;

  beforeEach(() => {
    pluginEmitter = new TypedEmitter<PluginEvents>();
    testRunner = {
      stop: jest.fn(),
    };
  });

  test("test runner stopped when all test sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

    const callFlowSession = new StubCallFlowSession();
    const testSession: TestSession = {
      callFlowTestDefinition: undefined,
      call: undefined,
      callFlowSession,
    };

    stopWhenAllTestsComplete.testStarted(testSession);

    callFlowSession.emit("allPromptsMatched", {
      transcription: "",
    });

    expect(testRunner.stop).toHaveBeenCalledWith(false);
  });

  test("test runner stopped with failure if any test sessions have timed-out", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

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

    stopWhenAllTestsComplete.testStarted(testSession1);
    stopWhenAllTestsComplete.testStarted(testSession2);

    testSession1.callFlowSession.emit("allPromptsMatched", {});
    testSession2.callFlowSession.emit("timeoutWaitingForMatch", {
      transcription: "",
    });

    const failure = true;
    expect(testRunner.stop).toHaveBeenCalledWith(failure);
  });

  test("test runner not stopped until all test sessions have matched all their prompts", () => {
    const stopWhenAllTestsComplete = new StopTestRunnerWhenTestsComplete();
    stopWhenAllTestsComplete.initialise(pluginEmitter, testRunner);

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

    stopWhenAllTestsComplete.testStarted(testSession1);
    stopWhenAllTestsComplete.testStarted(testSession2);

    testSession1.callFlowSession.emit("allPromptsMatched", {});

    expect(testRunner.stop).not.toHaveBeenCalled();
  });
});
