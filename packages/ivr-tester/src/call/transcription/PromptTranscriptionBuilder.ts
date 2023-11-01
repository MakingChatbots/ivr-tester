import { TranscriptEvent } from "./plugin/TranscriberPlugin";

export class PromptTranscriptionBuilder {
  private static readonly EMPTY_TRANSCRIPTION = "";

  private transcriptions: TranscriptEvent[] = [];

  public add(event: TranscriptEvent): void {
    this.transcriptions.push(event);
  }

  public clear(): void {
    this.transcriptions = [];
  }

  public merge(): string {
    if (this.transcriptions.length === 0) {
      return PromptTranscriptionBuilder.EMPTY_TRANSCRIPTION;
    }

    // If all transcripts partial then return last partial
    const areAllPartial = this.transcriptions.every((t) => t.isFinal === false);
    if (areAllPartial) {
      const lastPartial = this.transcriptions[this.transcriptions.length - 1];
      return lastPartial.transcription;
    }

    // If all transcripts 'final' then return all joined
    const areAllFinals = this.transcriptions.every((t) => t.isFinal);
    if (areAllFinals) {
      return this.transcriptions.map((t) => t.transcription).join(" ");
    }

    // Getting here means we have a combination of partial and final transcripts
    // Return joined finals and last partial
    const lastTranscription = this.transcriptions[
      this.transcriptions.length - 1
    ];
    const mergedFinals = this.transcriptions
      .filter((t) => t.isFinal)
      .map((t) => t.transcription)
      .join(" ");

    if (lastTranscription.isFinal) {
      return mergedFinals;
    } else {
      return `${mergedFinals} ${lastTranscription.transcription}`;
    }
  }
}
