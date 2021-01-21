import ws from "ws";
import { Emitter } from "../Emitter";

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

  close(reason: string): void;

  isOpen(): boolean;
}
