import { EventEmitter } from "events";

export interface TranscriptEvent {
  transcription: string;
}

export interface Transcriber extends EventEmitter {
  close(): void;
  transcribe(payload: Buffer): void;
  emit(event: "transcription", args: TranscriptEvent): boolean;
  on(event: "transcription", listener: (args: TranscriptEvent) => void): this;
}
