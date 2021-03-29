import { URL } from "url";
import { IvrNumber } from "../configuration/call/IvrNumber";

export interface AudioPlaybackCall {
  type: "audio-playback";
  call: Buffer;
}

export interface TelephonyCall {
  type: "telephony";
  call: IvrNumber;
}

export type RequestedCall = AudioPlaybackCall | TelephonyCall;

export interface Caller<T> {
  call(call: T, streamUrl: URL | string): Promise<RequestedCall>;
}
