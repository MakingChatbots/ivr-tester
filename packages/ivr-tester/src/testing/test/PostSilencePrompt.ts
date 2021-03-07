import { setTimeout } from "timers";
import { PromptDefinition } from "./conditions/PromptDefinition";
import { Call } from "../../call/Call";
import { PromptTranscriptionBuilder } from "../../call/transcription/PromptTranscriptionBuilder";
import { AbstractPrompt, MatchedCallback } from "./inOrder";

export class PostSilencePrompt extends AbstractPrompt {
  private skipPrompt = false;
  private timeout: ReturnType<typeof setTimeout>;

  constructor(
    readonly definition: PromptDefinition,
    private readonly call: Call,
    private readonly matchedCallback: MatchedCallback,
    private readonly timeoutSet: typeof setTimeout,
    private readonly timeoutClear: typeof clearTimeout
  ) {
    super();
  }

  public transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void {
    if (this.skipPrompt) {
      return super.transcriptUpdated(transcriptEvent);
    }

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
