/** @internal */
export enum TwilioConnectionEvents {
  MediaStreamStart = "start",
  Media = "media",
  Mark = "mark",
  CallEnded = "stop",
}

/** @internal */
export interface Call {
  from: string;
  to: string;
}
