import { Emitter } from "../../../Emitter";

export interface TranscriptEvent {
  /**
   * Indicates whether the transcription isn't going to change
   */
  isFinal: boolean;
  transcription: string;
}

export type TranscriptionEvents = {
  transcription: TranscriptEvent;
};

export interface TranscriberPlugin extends Emitter<TranscriptionEvents> {
  close(): void;
  transcribe(payload: Buffer): void;
  transcriptionComplete(): void;
}
