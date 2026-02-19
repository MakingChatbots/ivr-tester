import type { Call } from "../call/Call";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import type { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import type { Scenario } from "../configuration/scenario/Scenario";
import type { TestSession } from "../testRunner";
import { inOrder } from "./test/inOrder";

export interface TestExecutor {
  startTest(scenario: Scenario, call: Call): TestSession;
}

export function testExecutor(
  transcriberFactory: TranscriberFactory,
): TestExecutor {
  return {
    startTest(scenario: Scenario, call: Call): TestSession {
      const callTranscriber = new CallTranscriber(
        call,
        transcriberFactory.create(),
      );

      const callFlowSession = inOrder(scenario.steps).runAgainstCallFlow(
        callTranscriber,
        call,
      );

      return {
        call,
        scenario,
        callFlowSession,
      };
    },
  };
}
