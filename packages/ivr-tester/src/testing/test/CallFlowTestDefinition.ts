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

export interface SessionProgressEvent {
  transcription: string;
}

export interface PromptMatchedEvent {
  transcription: string;
  promptDefinition: PromptDefinition;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimeoutWaitingForMatchEvent {
  transcription: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AllPromptsMatchedEvent {}

export type CallFlowSessionEvents = {
  progress: SessionProgressEvent;
  promptMatched: PromptMatchedEvent;
  allPromptsMatched: AllPromptsMatchedEvent;
  timeoutWaitingForMatch: TimeoutWaitingForMatchEvent;
};

export type CallFlowSession = Emitter<CallFlowSessionEvents>;

export interface CallFlowInstructions {
  runAgainstCallFlow(
    transcriber: Emitter<TranscriptionEvents>,
    call: Call
  ): CallFlowSession;
}

export interface CallFlowTestDefinition {
  // TODO Enforce that test names are defined and unique
  name: string;
  instructions: CallFlowInstructions;
}
