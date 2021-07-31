import { Call } from "../call/Call";
import { TestSession } from "../testRunner";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { Scenario } from "../configuration/scenario/Scenario";
import { orderedScenarioStepsTest } from "./test/orderedScenarioStepsTest";

/**
 * Executes a test scenario against a call.
 */
export interface TestExecutor {
  startTest(scenario: Scenario, call: Call): TestSession;
}

export function testExecutor(
  transcriberFactory: TranscriberFactory
): TestExecutor {
  return {
    startTest(scenario: Scenario, call: Call): TestSession {
      const callTranscriber = new CallTranscriber(
        call,
        transcriberFactory.create()
      );

      const callFlowTest = orderedScenarioStepsTest(scenario.steps);
      const callFlowTestSession = callFlowTest.runAgainstCallFlow(
        callTranscriber,
        call
      );

      return {
        call,
        scenario,
        callFlowTestSession,
      };
    },
  };
}
