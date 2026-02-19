import type { Call } from "../../call/Call";
import type { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import type { Step } from "../../configuration/scenario/Step";
import type { Emitter } from "../../Emitter";

export interface SessionProgressEvent {
  transcription: string;
}

export interface PromptMatchedEvent {
  transcription: string;
  promptDefinition: Step;
}

export interface TimeoutWaitingForMatchEvent {
  transcription: string;
  promptDefinition?: Step;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type AllPromptsMatchedEvent = {};

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
    call: Call,
  ): CallFlowSession;
}
