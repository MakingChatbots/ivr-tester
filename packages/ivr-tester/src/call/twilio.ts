export enum TwilioConnectionEvents {
  MediaStreamStart = "start",
  Media = "media",
  Mark = "mark",
  CallEnded = "stop",
}

export interface Call {
  from: string;
  to: string;
}
