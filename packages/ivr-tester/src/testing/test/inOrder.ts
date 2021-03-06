import { PromptDefinition } from "./conditions/PromptDefinition";
import { TestResult } from "./TestInstanceClass";
import { TestContainer } from "./IvrTest";
import { setTimeout } from "timers";
import { TranscriptEvent } from "../../call/transcription/plugin/TranscriberPlugin";
import { Call } from "../../call/Call";

interface Handler {
  setNext(handler: Handler): Handler;

  handle(transcriptEvent: TranscriptEvent): void;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(transcriptEvent: TranscriptEvent): void {
    if (this.nextHandler) {
      return this.nextHandler.handle(transcriptEvent);
    }

    return null;
  }
}
// class PromptTranscriptionBuilder {
//   private static readonly EMPTY_TRANSCRIPTION = "";
//
//   private transcriptions: TranscriptEvent[] = [];
//
//   public add(event: TranscriptEvent): void {
//     this.transcriptions.push(event);
//   }
//
//   public clear(): void {
//     this.transcriptions = [];
//   }
//
//   public merge(): string {
//     if (this.transcriptions.length === 0) {
//       return PromptTranscriptionBuilder.EMPTY_TRANSCRIPTION;
//     }
//
//     // If all transcripts partial then return last partial
//     const areAllPartial = this.transcriptions.every((t) => t.isFinal === false);
//     if (areAllPartial) {
//       const lastPartial = this.transcriptions[this.transcriptions.length - 1];
//       return lastPartial.transcription;
//     }
//
//     // Return finals
//     const areAllFinals = this.transcriptions.every((t) => t.isFinal);
//     if (areAllFinals) {
//       return this.transcriptions.map((t) => t.transcription).join(" ");
//     }
//
//     // Return Merged finals and last partial
//     const lastTranscription = this.transcriptions[
//     this.transcriptions.length - 1
//         ];
//     const mergedFinals = this.transcriptions
//         .filter((t) => t.isFinal)
//         .map((t) => t.transcription)
//         .join(" ");
//
//     if (lastTranscription.isFinal) {
//       return mergedFinals;
//     } else {
//       return `${mergedFinals} ${lastTranscription.transcription}`;
//     }
//   }
// }

class PostSilencePrompt extends AbstractHandler {
  private promptHappened = false;

  constructor(
    private readonly definition: PromptDefinition,
    private readonly call: Call
  ) {
    super();
  }

  public handle(transcriptEvent: TranscriptEvent): void {
    if (this.promptHappened) {
      return super.handle(transcriptEvent);
    }

    if (this.definition.whenPrompt(transcriptEvent.transcription)) {
      this.promptHappened = true;
      this.definition.then.do(this.call);
    }
  }
}

type PromptCollection = (
  prompts: ReadonlyArray<PromptDefinition>
) => TestContainer;

/**
 * Executes {@link PromptDefinition}'s in order
 */
export const inOrder: PromptCollection = (prompts) => {
  // let nextConditionIndex = 0;
  //
  // const clonedConditions = Array.isArray(conditions) ? [...conditions] : [];

  return {
    start(transcriber, call) {
      const postSilencePrompts = prompts.map(
        (prompt) => new PostSilencePrompt(prompt, call)
      );

      if (postSilencePrompts.length === 0) {
        return {} as any;
      }

      const firstPrompt: Handler = postSilencePrompts[0];

      let chain: Handler = firstPrompt;
      postSilencePrompts.shift();

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
