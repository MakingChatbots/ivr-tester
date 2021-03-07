import { Call } from "../../call/Call";
import { Emitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { PromptDefinition } from "./conditions/PromptDefinition";

// export interface TestResult {
//   matchedPrompt?: PromptDefinition;
//   result: "continue" | "fail" | "pass";
// }

// export interface TestFailed {
//   test: CallFlowTest;
//   transcription: string;
// }
//
// export interface TestPassed {
//   test: CallFlowTest;
// }

export interface PromptMatchedEvent {
  transcription: string;
  promptDefinition: PromptDefinition;
}

// export interface TestProgressEvent {
//   test: CallFlowTest;
//   transcription: {
//     isFinal: boolean;
//     transcription: string;
//   };
// }

export type TestInstanceEvents = {
  // testFailed: TestFailed;
  // testPassed: TestPassed;
  promptMatched: PromptMatchedEvent;
  // processingTranscript: TestProgressEvent;
};

export interface CallFlowInstructions extends Emitter<TestInstanceEvents> {
  startListening(transcriber: Emitter<TranscriptionEvents>, call: Call): void;
}

export interface CallFlowTest {
  // TODO Enforce that test names are defined and unique
  name: string;
  test: CallFlowInstructions;
}
