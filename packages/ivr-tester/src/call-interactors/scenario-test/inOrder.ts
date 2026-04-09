import type { CallStreamAdapter } from '../../call/CallStreamAdapter.js';
import type {
  TranscriptEvent,
  TranscriptionEvents,
} from '../../call-interactor-utilities/transcription/index.js';
import { type Emitter, TypedEmitter } from '../../Emitter.js';
import type { CallFlowSession, CallFlowSessionEvents } from './CallFlowInstructions.js';
import { PostSilencePrompt } from './prompts/PostSilencePrompt.js';
import { PromptTranscriptionBuilder } from './prompts/PromptTranscriptionBuilder.js';
import type { Step } from './scenario-definition/Step.js';

export interface Prompt {
  readonly definition: Step;
  setNext(prompt: Prompt): Prompt;
  // TODO Refactor PromptTranscriptionBuilder parameter
  transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void;
}

export type MatchedCallback = (prompt: Prompt, transcriptMatched: string) => void;

export type TimeoutCallback = (prompt: Prompt, transcript: string) => void;

export type PromptFactory = (
  definition: Step,
  call: CallStreamAdapter,
  matchedCallback: MatchedCallback,
  timeoutCallback: TimeoutCallback,
  timeoutSet: typeof setTimeout,
  timeoutClear: typeof clearTimeout,
) => Prompt | undefined;

export const defaultPromptFactory: PromptFactory = (
  definition,
  call,
  matchedCallback,
  timeoutCallback,
  timeoutSet,
  timeoutClear,
) =>
  new PostSilencePrompt(
    definition,
    call,
    matchedCallback,
    timeoutCallback,
    timeoutSet,
    timeoutClear,
  );

export class RunningOrderedCallFlowInstructions
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowSession
{
  constructor(
    private readonly promptDefinitions: ReadonlyArray<Step>,
    private readonly promptFactory: PromptFactory,
    private readonly transcriber: Emitter<TranscriptionEvents>,
    private readonly call: CallStreamAdapter,
    private readonly timeoutSet: typeof setTimeout,
    private readonly timeoutClear: typeof clearTimeout,
  ) {
    super();
    this.initialise();
  }

  // TODO Tidy this
  private initialise(): void {
    const timedOutCallback: TimeoutCallback = (prompt, transcript) => {
      this.emit('timeoutWaitingForMatch', {
        transcription: transcript,
        promptDefinition: prompt.definition,
      });
    };

    const matchedCallback: MatchedCallback = (prompt, transcriptMatched) => {
      this.emit('promptMatched', {
        transcription: transcriptMatched,
        promptDefinition: prompt.definition,
      });
    };
    const lastMatchedCallback: MatchedCallback = (prompt, transcriptMatched) => {
      matchedCallback(prompt, transcriptMatched);
      this.emit('allPromptsMatched', {});
    };

    const prompts = this.promptDefinitions.map((prompt, index) => {
      const callback =
        this.promptDefinitions.length - 1 === index ? lastMatchedCallback : matchedCallback;

      return this.promptFactory(
        prompt,
        this.call,
        callback,
        timedOutCallback,
        this.timeoutSet,
        this.timeoutClear,
      );
    });

    const firstPrompt: Prompt = prompts.shift();
    let chain: Prompt = firstPrompt;

    prompts.forEach((item) => {
      chain = chain.setNext(item);
    });

    const promptTranscriptionBuilder = new PromptTranscriptionBuilder();

    const onTranscription = (event: TranscriptEvent) => {
      if (this.promptDefinitions.length === 0) {
        this.emit('allPromptsMatched', {});
        return;
      }

      promptTranscriptionBuilder.add(event);
      this.emit('progress', {
        transcription: promptTranscriptionBuilder.merge(),
      });

      firstPrompt.transcriptUpdated(promptTranscriptionBuilder);
    };

    this.transcriber.on('transcription', onTranscription);
  }
}
