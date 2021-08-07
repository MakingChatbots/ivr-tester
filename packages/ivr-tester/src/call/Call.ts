import ws from "ws";
import { Emitter, TypedEmitter } from "../Emitter";
import { TranscriptionEvents } from "./transcription/plugin/TranscriberPlugin";

export interface CallClosedEvent {
  by: "caller" | "ivr-tester" | "unknown";
  reason?: string;
}

export type CallEvents = {
  callClosed: CallClosedEvent;
};

/**
 * Represents an active call
 */
export interface Call extends Emitter<CallEvents> {
  /**
   * Sends DTMF tone to the call
   */
  sendDtmfTone(dtmfSequence: string): void;

  /**
   * Sends 8 bit PCM encoded (MULAW) at 8000 Hertz media to call
   */
  sendMedia(buffer: Buffer): void;

  getStream(): ws;

  getTranscriber(): TypedEmitter<TranscriptionEvents>;

  close(reason: string): void;

  isOpen(): boolean;
}
