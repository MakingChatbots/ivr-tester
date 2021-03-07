import { CallFlowInstructions, CallFlowTest } from "./test/CallFlowTest";
import { Call } from "../call/Call";

export interface TestExecutor {
  startTest(callFlowTest: CallFlowTest, call: Call): CallFlowInstructions;
}
//
// export class DefaultTestExecutor implements TestExecutor {
//   constructor(private readonly transcriberFactory: TranscriberFactory) {}
//
//   public startTest(
//     callFlowTest: CallFlowTest,
//     call: Call
//   ): CallFlowInstructions {
//     const callTranscriber = new CallTranscriber(
//       call,
//       this.transcriberFactory.create()
//     );
//
//     callFlowTest.test.startListening(callTranscriber, call);
//     return callFlowTest.test;
//   }
// }
