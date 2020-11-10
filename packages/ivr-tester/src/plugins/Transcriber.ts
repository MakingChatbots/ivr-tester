import {Emitter} from "./events/Emitter";

export interface TranscriptEvent {
  transcription: string;
}

export type TranscriptionEvents = {
  transcription: TranscriptEvent;
};

export interface Transcriber extends Emitter<TranscriptionEvents> {
  close(): void;
  transcribe(payload: Buffer): void;
}
