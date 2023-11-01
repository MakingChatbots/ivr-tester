import ws from "ws";
import { Emitter, TypedEmitter } from "../Emitter";
import { TranscriptionEvents } from "./transcription/plugin/TranscriberPlugin";

/**
 * Event indicating when the call's media stream starts. It is only
 * at this point that the call receives details about the call.
 */
export interface CallMediaStreamStarted {
  streamSid: string;
  fromNumber: string;
  toNumber: string;
}

export interface CallClosedEvent {
  by: "caller" | "ivr-tester" | "unknown";
  reason?: string;
}

export type CallEvents = {
  callMediaStreamStarted: CallMediaStreamStarted;
  callClosed: CallClosedEvent;
};

/**
 * Represents an active call
 */
export interface Call extends Emitter<CallEvents> {
  /**
   * Description used to describe the call.
   *
   * This is useful for plugins that want a friendly name for the
   * call, such as the filename of a recording
   */
  description: string;

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
