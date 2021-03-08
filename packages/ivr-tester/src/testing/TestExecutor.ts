import { CallFlowTestDefinition } from "./test/CallFlowTestDefinition";
import { Call } from "../call/Call";
import { TestSession } from "../testRunner";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";

export interface TestExecutor {
  startTest(callFlowTest: CallFlowTestDefinition, call: Call): TestSession;
}

export function testExecutor(
  transcriberFactory: TranscriberFactory
): TestExecutor {
  return {
    startTest(
      callFlowTestDefinition: CallFlowTestDefinition,
      call: Call
    ): TestSession {
      const callTranscriber = new CallTranscriber(
        call,
        transcriberFactory.create()
      );

      const callFlowSession = callFlowTestDefinition.instructions.runAgainstCallFlow(
        callTranscriber,
        call
      );

      return {
        call,
        callFlowTestDefinition,
        callFlowSession,
      };
    },
  };
}
