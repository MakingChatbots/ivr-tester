// import { PromptDefinition } from "./conditions/PromptDefinition";
// import { Call } from "../../call/Call";
// import { Emitter, TypedEmitter } from "../../Emitter";
// import { CallFlowTest } from "./CallFlowTest";
// import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
// //
// // export interface TestResult {
// //   matchedPrompt?: PromptDefinition;
// //   result: "continue" | "fail" | "pass";
// // }
// //
// // export interface TestFailed {
// //   test: CallFlowTest;
// //   transcription: string;
// // }
// //
// // export interface TestPassed {
// //   test: CallFlowTest;
// // }
// //
// // export interface TestConditionMet {
// //   test: CallFlowTest;
// //   transcription: string;
// //   condition: PromptDefinition;
// // }
// //
// // export interface TestProgressEvent {
// //   test: CallFlowTest;
// //   transcription: {
// //     isFinal: boolean;
// //     transcription: string;
// //   };
// // }
// //
// // export type TestInstanceEvents = {
// //   testFailed: TestFailed;
// //   testPassed: TestPassed;
// //   conditionMet: TestConditionMet;
// //   progress: TestProgressEvent;
// // };
// //
import { CallFlowTest } from "./CallFlowTest";
import { Call } from "../../call/Call";

export interface TestInstance {
  getTest(): CallFlowTest;
  getCall(): Call;
}
//
// /**
//  * Conditions have to have been met in sequence
//  * @internal
//  */
// // TODO Rename
// export class TestInstanceClass
//   extends TypedEmitter<TestInstanceEvents>
//   implements TestInstance {
//   constructor(
//     private readonly call: Call,
//     private readonly callTranscriber: Emitter<TranscriptionEvents>,
//     private readonly ivrTest: CallFlowTest
//   ) {
//     super();
//     this.initionalise();
//     // callTranscriber.on("transcription", this.processTranscript.bind(this));
//   }
//
//   public getCall(): Call {
//     return this.call;
//   }
//
//   private initionalise(): void {}
//
//   private processTranscript(event: PromptTranscriptionEvent): void {
//     const { transcription: callTranscriber } = event;
//
//     this.emit("progress", {
//       test: this.ivrTest,
//       transcription: {
//         isFinal: event.isComplete,
//         transcription: callTranscriber,
//       },
//     });
//
//     if (!event.isComplete) {
//       return;
//     }
//
//     this.ivrTest.test.startListening(this.callTranscriber, this.call);
//
//     switch (testOutcome.result) {
//       case "continue":
//         if (testOutcome.matchedPrompt) {
//           this.notifyOfConditionBeingMet(
//             callTranscriber,
//             testOutcome.matchedPrompt
//           );
//         }
//         return;
//       case "pass":
//         if (testOutcome.matchedPrompt) {
//           this.notifyOfConditionBeingMet(
//             callTranscriber,
//             testOutcome.matchedPrompt
//           );
//         }
//         this.notifyOfPassedTest();
//         return;
//       case "fail":
//         this.notifyOfFailedTest(callTranscriber);
//         return;
//       default:
//         return;
//     }
//   }
//
//   private notifyOfPassedTest(): void {
//     const event: TestPassed = {
//       test: this.ivrTest,
//     };
//     this.emit("testPassed", event);
//   }
//
//   private notifyOfFailedTest(transcription: string): void {
//     const event: TestFailed = { transcription, test: this.ivrTest };
//     this.emit("testFailed", event);
//   }
//
//   private notifyOfConditionBeingMet(
//     transcription: string,
//     condition: PromptDefinition
//   ): void {
//     const event: TestConditionMet = {
//       test: this.ivrTest,
//       transcription,
//       condition,
//     };
//     this.emit("conditionMet", event);
//   }
//
//   getTest(): CallFlowTest {
//     return this.ivrTest;
//   }
// }
