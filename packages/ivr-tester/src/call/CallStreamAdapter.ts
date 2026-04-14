import type ws from 'ws';
import type { Emitter } from '../Emitter.js';

export enum WebSocketEvents {
  Message = 'message',
  Close = 'close',
}

/**
 * Event indicating when the call's media stream starts. It is only
 * at this point that the call receives details about the call.
 */
export interface CallMediaStreamStarted {
  streamSid: string;
  callId: string;
}

export interface CallClosedEvent {
  by: 'caller' | 'ivr-tester' | 'unknown';
  reason?: string;
}

export type CallEvents = {
  callMediaStreamStarted: CallMediaStreamStarted;
  callClosed: CallClosedEvent;
};

/**
 * Represents an active call
 */
export interface CallStreamAdapter extends Emitter<CallEvents> {
  /**
   * Sends 8 bit PCM encoded (MULAW) at 8000 Hertz media to call
   */
  sendMedia(buffer: Buffer, description?: string): void;

  getStream(): ws;

  close(reason: string): void;

  isOpen(): boolean;
}
