import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

/** @internal */
export enum TwilioConnectionEvents {
  MediaStreamStart = "start",
  Media = "media",
  CallEnded = "stop",
}

/** @internal */
export interface TwilioMediaStreamStartEvent {
  event: TwilioConnectionEvents.MediaStreamStart;
  streamSid: string;
  start: {
    customParameters: { from: string; to: string };
  };
}

/** @internal */
export interface Call {
  from: string;
  to: string;
}

/** @internal */
export const callParameterSerializer = {
  addParameters(stream: VoiceResponse.Stream, call: Call): void {
    stream.parameter({ name: "from", value: call.from });
    stream.parameter({ name: "to", value: call.to });
  },
  extractParameters(event: TwilioMediaStreamStartEvent): Call {
    const from = event?.start?.customParameters?.from;
    const to = event?.start?.customParameters?.to;

    if (!from || !to) {
      throw new Error(
        "Start Media event does not contain from/to custom parameters"
      );
    }

    return { from, to };
  },
};
