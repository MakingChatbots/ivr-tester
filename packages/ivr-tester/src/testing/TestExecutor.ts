import { Call } from "../call/Call";
import { TestSession } from "../testRunner";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { TestScenario } from "./scenario/TestScenario";
import { inOrder } from "./test/inOrder";

export interface TestExecutor {
  startTest(callFlowTest: TestScenario, call: Call): TestSession;
}

export function testExecutor(
  transcriberFactory: TranscriberFactory
): TestExecutor {
  return {
    startTest(callFlowTestDefinition: TestScenario, call: Call): TestSession {
      const callTranscriber = new CallTranscriber(
        call,
        transcriberFactory.create()
      );

      const callFlowSession = inOrder(
        callFlowTestDefinition.instructions
      ).runAgainstCallFlow(callTranscriber, call);

      return {
        call,
        callFlowTestDefinition,
        callFlowSession,
      };
    },
  };
}
