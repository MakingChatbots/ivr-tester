import { PromptDefinition } from "./conditions/PromptDefinition";
import { CallFlowInstructions } from "./CallFlowTest";
import { setTimeout } from "timers";
import { TranscriptEvent } from "../../call/transcription/plugin/TranscriberPlugin";
import { Call } from "../../call/Call";
import {
  CallTranscriptionEvents,
  PromptTranscriptionEvent,
} from "../../call/transcription/CallTranscriber";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(transcriptEvent: PromptTranscriptionEvent): void;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(transcriptEvent: PromptTranscriptionEvent): void {
    if (this.nextHandler) {
      return this.nextHandler.handle(transcriptEvent);
    }

    return;
  }
}

export class Prompt extends AbstractHandler {
  private skipPrompt = false;
  private timeout: ReturnType<typeof setTimeout>;

  constructor(
    private readonly definition: PromptDefinition,
    private readonly call: Call,
    private readonly timeoutSet: typeof setTimeout,
    private readonly timeoutClear: typeof clearTimeout
  ) {
    super();
  }

  public handle(transcriptEvent: PromptTranscriptionEvent): void {
    if (this.skipPrompt) {
      return super.handle(transcriptEvent);
    }

    this.clearTimer();
    if (this.definition.whenPrompt(transcriptEvent.transcription)) {
      // The timeout interval that is set cannot be relied upon to execute after that
      // exact number of milliseconds. This is because other executing code that blocks
      // or holds onto the event loop will push the execution of the timeout back. The only
      // guarantee is that the timeout will not execute sooner than the declared
      // timeout interval.
      // -- https://nodejs.org/en/docs/guides/timers-in-node/
      this.timeout = this.timeoutSet(() => {
        this.skipPrompt = true;
        this.clearTimer();
        this.definition.then.do(this.call);
      }, this.definition.silenceAfterPrompt);
    }
  }

  private clearTimer() {
    if (this.timeout) {
      this.timeoutClear(this.timeout);
      this.timeout = undefined;
    }
  }
}

export type PromptFactory = (
  definition: PromptDefinition,
  call: Call
) => Handler | undefined;

const defaultPromptFactory: PromptFactory = (definition, call) =>
  new Prompt(definition, call, setTimeout, clearTimeout);

/**
 * Creates an ordered prompt collection
 */
export const inOrder = (
  prompts: ReadonlyArray<PromptDefinition>,
  promptFactory: PromptFactory = defaultPromptFactory
): CallFlowInstructions => {
  return {
    startListening(transcriber, call) {
      promptTranscriptionBuilder;
      const postSilencePrompts = prompts.map((prompt) =>
        promptFactory(prompt, call)
      );

      if (postSilencePrompts.length === 0) {
        return {} as any;
      }

      const firstPrompt: Handler = postSilencePrompts.shift();
      let chain: Handler = firstPrompt;

      postSilencePrompts.forEach((item) => {
        chain = chain.setNext(item);
      });

      transcriber.on("transcription", (event) => {
        firstPrompt.handle(event);
      });

      return {} as any;
      // const condition = clonedConditions[nextConditionIndex];
      // if (!condition) {
      //   return { result: "pass" };
      // }
      //
      // const isMatch = condition.whenPrompt(transcript);
      // if (!isMatch) {
      //   return { result: "fail" };
      // }
      //
      // condition.then.do(call);
      //
      // nextConditionIndex++;
      //
      // const isLastCondition = !clonedConditions[nextConditionIndex];
      //
      // return {
      //   matchedPrompt: condition,
      //   result: isLastCondition ? "pass" : "continue",
      // };
    },
  };
};
