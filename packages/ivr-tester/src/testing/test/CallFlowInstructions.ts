import { Call } from "../../call/Call";
import { Emitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { Step } from "../../configuration/scenario/Step";

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
