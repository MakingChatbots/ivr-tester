import { PromptDefinition } from "./conditions/PromptDefinition";
import { CallFlowInstructions, TestInstanceEvents } from "./CallFlowTest";
import { setTimeout } from "timers";
import { Call } from "../../call/Call";
import { PromptTranscriptionBuilder } from "../../call/transcription/PromptTranscriptionBuilder";
import { Emitter, TypedEmitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { PostSilencePrompt } from "./PostSilencePrompt";

interface Prompt {
  readonly definition: PromptDefinition;
  setNext(prompt: Prompt): Prompt;
  // TODO Refactor PromptTranscriptionBuilder parameter
  transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void;
}

export abstract class AbstractPrompt implements Prompt {
  private nextPrompt: Prompt;

  public setNext(prompt: Prompt): Prompt {
    this.nextPrompt = prompt;
    return prompt;
  }

  public transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void {
    if (this.nextPrompt) {
      return this.nextPrompt.transcriptUpdated(transcriptEvent);
    }
    return;
  }

  public abstract readonly definition: PromptDefinition;
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

class OrderedCallFlowInstructions
  extends TypedEmitter<TestInstanceEvents>
  implements CallFlowInstructions {
  constructor(
    private readonly promptDefinitions: ReadonlyArray<PromptDefinition>,
    private readonly promptFactory: PromptFactory
  ) {
    super();
  }

  public startListening(
    transcriber: Emitter<TranscriptionEvents>,
    call: Call
  ): void {
    const matchedCallback: MatchedCallback = (prompt, transcriptMatched) => {
      this.emit("promptMatched", {
        transcription: transcriptMatched,
        promptDefinition: prompt.definition,
      });
    };

    const prompts = this.promptDefinitions.map((prompt) =>
      this.promptFactory(prompt, call, matchedCallback)
    );

    if (prompts.length === 0) {
      return;
    }

    const firstPrompt: Prompt = prompts.shift();
    let chain: Prompt = firstPrompt;

    prompts.forEach((item) => {
      chain = chain.setNext(item);
    });

    const promptTranscriptionBuilder = new PromptTranscriptionBuilder();

    transcriber.on("transcription", (event) => {
      promptTranscriptionBuilder.add(event);
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
): CallFlowInstructions =>
  new OrderedCallFlowInstructions(promptDefinitions, promptFactory);
