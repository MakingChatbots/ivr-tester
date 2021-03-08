import { setTimeout } from "timers";
import { PromptDefinition } from "./conditions/PromptDefinition";
import { Call } from "../../call/Call";
import { PromptTranscriptionBuilder } from "../../call/transcription/PromptTranscriptionBuilder";
import { MatchedCallback, Prompt } from "./inOrder";

export class PostSilencePrompt implements Prompt {
  private timeout: ReturnType<typeof setTimeout>;
  private skipPrompt = false;
  private nextPrompt: Prompt;

  constructor(
    public readonly definition: PromptDefinition,
    private readonly call: Call,
    private readonly matchedCallback: MatchedCallback,
    private readonly timeoutSet: typeof setTimeout,
    private readonly timeoutClear: typeof clearTimeout
  ) {}

  public setNext(prompt: Prompt): Prompt {
    this.nextPrompt = prompt;
    return prompt;
  }

  public transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void {
    if (this.skipPrompt && this.nextPrompt) {
      this.nextPrompt.transcriptUpdated(transcriptEvent);
    } else {
      this.processUpdatedTranscript(transcriptEvent);
    }
  }

  private processUpdatedTranscript(
    transcriptEvent: PromptTranscriptionBuilder
  ): void {
    this.clearTimer();

    const transcript = transcriptEvent.merge();
    if (this.definition.whenPrompt(transcript)) {
      // The timeout interval that is set cannot be relied upon to execute after that
      // exact number of milliseconds. This is because other executing code that blocks
      // or holds onto the event loop will push the execution of the timeout back. The only
      // guarantee is that the timeout will not execute sooner than the declared
      // timeout interval.
      // -- https://nodejs.org/en/docs/guides/timers-in-node/
      this.timeout = this.timeoutSet(() => {
        this.skipPrompt = true;
        this.clearTimer();
        transcriptEvent.clear();
        this.matchedCallback(this, transcript);
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
