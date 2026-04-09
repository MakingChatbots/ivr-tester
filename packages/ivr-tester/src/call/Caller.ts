import type { URL } from 'node:url';
import type ws from 'ws';
import type { IvrNumber } from '../configuration/call/IvrNumber';
import type { CallStreamAdapter } from './CallStreamAdapter';

export interface AudioPlaybackCall {
  type: 'audio-playback';
  call: Buffer;
}

export interface TelephonyCall {
  type: 'telephony';
  call: IvrNumber;
}

export type RequestedCall = AudioPlaybackCall | TelephonyCall;

/**
 * Interface for managing vendor specific call/audio-stream handling
 */
export interface Caller<T> {
  call(call: T, streamUrl: URL | string, callId: string): Promise<RequestedCall>;
  callStreamReceived(callWebSocket: ws): CallStreamAdapter;
}
