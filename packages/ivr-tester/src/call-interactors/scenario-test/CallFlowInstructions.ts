import type { Emitter } from '../../Emitter';
import type { Step } from './scenario-definition/Step';

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
