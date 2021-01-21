import { URL } from "url";
import { TestSubject } from "../handlers/TestInstanceClass";

export interface AudioPlaybackCall {
  type: "audio-playback";
  call: Buffer;
}

export interface TelephonyCall {
  type: "telephony";
  call: TestSubject;
}

export type RequestedCall = AudioPlaybackCall | TelephonyCall;

export interface Caller<T> {
  call(call: T, streamUrl: URL | string): Promise<RequestedCall>;
}
