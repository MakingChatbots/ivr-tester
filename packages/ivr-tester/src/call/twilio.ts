/** @internal */
export enum TwilioConnectionEvents {
  MediaStreamStart = "start",
  Media = "media",
  CallEnded = "stop",
}

/** @internal */
export interface Call {
  from: string;
  to: string;
}
