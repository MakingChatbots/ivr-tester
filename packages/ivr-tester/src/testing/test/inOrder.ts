import { PromptDefinition } from "./conditions/PromptDefinition";
import {
  CallFlowInstructions,
  CallFlowSession,
  CallFlowSessionEvents,
} from "./CallFlowTestDefinition";
import { setTimeout } from "timers";
import { Call } from "../../call/Call";
import { PromptTranscriptionBuilder } from "../../call/transcription/PromptTranscriptionBuilder";
import { Emitter, TypedEmitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { PostSilencePrompt } from "./PostSilencePrompt";

export interface Prompt {
  readonly definition: PromptDefinition;
  setNext(prompt: Prompt): Prompt;
  // TODO Refactor PromptTranscriptionBuilder parameter
  transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void;
}

export type MatchedCallback = (
  prompt: Prompt,
  transcriptMatched: string
) => void;

export type PromptFactory = (
  definition: PromptDefinition,
  call: Call,
  matchedCallback: MatchedCallback
) => Prompt | undefined;

const defaultPromptFactory: PromptFactory = (
  definition,
  call,
  matchedCallback
) =>
  new PostSilencePrompt(
    definition,
    call,
    matchedCallback,
    setTimeout,
    clearTimeout
  );

class RunningOrderedCallFlowInstructions
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowSession {
  constructor(
    private readonly promptDefinitions: ReadonlyArray<PromptDefinition>,
    private readonly promptFactory: PromptFactory,
    private readonly transcriber: Emitter<TranscriptionEvents>,
    private readonly call: Call
  ) {
    super();
    this.initialise();
  }

  private initialise(): void {
    const matchedCallback: MatchedCallback = (prompt, transcriptMatched) => {
      this.emit("promptMatched", {
        transcription: transcriptMatched,
        promptDefinition: prompt.definition,
      });
    };
    const lastMatchedCallback: MatchedCallback = (
      prompt,
      transcriptMatched
    ) => {
      matchedCallback(prompt, transcriptMatched);
      this.emit("allPromptsMatched", {});
    };

    const prompts = this.promptDefinitions.map((prompt, index) => {
      const callback =
        this.promptDefinitions.length - 1 === index
          ? lastMatchedCallback
          : matchedCallback;
      return this.promptFactory(prompt, this.call, callback);
    });

    if (prompts.length === 0) {
      return;
    }

    const firstPrompt: Prompt = prompts.shift();
    let chain: Prompt = firstPrompt;

    prompts.forEach((item) => {
      chain = chain.setNext(item);
    });

    const promptTranscriptionBuilder = new PromptTranscriptionBuilder();

    this.transcriber.on("transcription", (event) => {
      promptTranscriptionBuilder.add(event);
      this.emit("progress", {
        transcription: promptTranscriptionBuilder.merge(),
      });

      firstPrompt.transcriptUpdated(promptTranscriptionBuilder);
    });
  }
}

/**
 * Creates an ordered prompt collection
 */
export const inOrder = (
  promptDefinitions: ReadonlyArray<PromptDefinition>,
  promptFactory: PromptFactory = defaultPromptFactory
): CallFlowInstructions => ({
  runAgainstCallFlow: (
    transcriber: Emitter<TranscriptionEvents>,
    call: Call
  ): CallFlowSession =>
    new RunningOrderedCallFlowInstructions(
      promptDefinitions,
      promptFactory,
      transcriber,
      call
    ),
});
