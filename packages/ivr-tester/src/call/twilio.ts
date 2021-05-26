import { Twilio } from "twilio";

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

export interface TwilioClientAuth {
  accountSid: string;
  authToken: string;
}

export type TwilioClientFactory = (auth: TwilioClientAuth) => Twilio;
