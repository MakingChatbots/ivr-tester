import { setTimeout } from "timers";
import { Step } from "../../configuration/scenario/Step";
import { Call } from "../../call/Call";
import { PromptTranscriptionBuilder } from "../../call/transcription/PromptTranscriptionBuilder";
import { MatchedCallback, Prompt, TimeoutCallback } from "./inOrder";

export class PostSilencePrompt implements Prompt {
  private timeoutTimer: ReturnType<typeof setTimeout>;
  private promptTimedOut = false;
  private isFirstInvocation = true;
  private lastKnownTranscript = "";

  private silenceAfterPromptTimer: ReturnType<typeof setTimeout>;
  private skipPrompt = false;
  private nextPrompt: Prompt;

  constructor(
    public readonly definition: Step,
    private readonly call: Call,
    private readonly matchedCallback: MatchedCallback,
    private readonly timeoutCallback: TimeoutCallback,
    private readonly timeoutSet: typeof setTimeout,
    private readonly timeoutClear: typeof clearTimeout
  ) {}

  public setNext(prompt: Prompt): Prompt {
    this.nextPrompt = prompt;
    return prompt;
  }

  public transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void {
    if (this.promptTimedOut) {
      return;
    }

    if (this.skipPrompt && this.nextPrompt) {
      this.nextPrompt.transcriptUpdated(transcriptEvent);
      return;
    }

    this.lastKnownTranscript = transcriptEvent.merge();
    if (this.isFirstInvocation) {
      this.startTimeoutTimer();
      this.isFirstInvocation = false;
    }

    this.processUpdatedTranscript(transcriptEvent);
  }

  private processUpdatedTranscript(
    transcriptEvent: PromptTranscriptionBuilder
  ): void {
    this.clearSilenceAfterPromptTimer();

    const transcript = transcriptEvent.merge();
    if (this.definition.whenPrompt(transcript)) {
      this.clearTimeoutTimer();

      // The timeout interval that is set cannot be relied upon to execute after that
      // exact number of milliseconds. This is because other executing code that blocks
      // or holds onto the event loop will push the execution of the timeout back. The only
      // guarantee is that the timeout will not execute sooner than the declared
      // timeout interval.
      // -- https://nodejs.org/en/docs/guides/timers-in-node/
      this.silenceAfterPromptTimer = this.timeoutSet(() => {
        this.skipPrompt = true;

        this.clearSilenceAfterPromptTimer();
        transcriptEvent.clear();
        this.matchedCallback(this, transcript);
        this.definition.then.do(this.call);
      }, this.definition.silenceAfterPrompt);
    }
  }

  private clearSilenceAfterPromptTimer() {
    if (this.silenceAfterPromptTimer) {
      this.timeoutClear(this.silenceAfterPromptTimer);
      this.silenceAfterPromptTimer = undefined;
    }
  }

  private startTimeoutTimer() {
    this.timeoutTimer = this.timeoutSet(() => {
      this.promptTimedOut = true;
      this.timeoutCallback(this, this.lastKnownTranscript);
    }, this.definition.timeout);
  }

  private clearTimeoutTimer() {
    if (this.timeoutTimer) {
      this.timeoutClear(this.timeoutTimer);
      this.timeoutTimer = undefined;
    }
  }
}
