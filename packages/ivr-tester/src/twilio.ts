export enum TwilioConnectionEvents {
  // eslint-disable-next-line no-unused-vars
  MediaStreamStart = "start",
  // eslint-disable-next-line no-unused-vars
  Media = "media",
  // eslint-disable-next-line no-unused-vars
  CallEnded = "stop",
}

export interface TwilioMediaStreamStartEvent {
  event: TwilioConnectionEvents.MediaStreamStart;
  streamSid: string;
  start: {
    customParameters: { from: string; to: string };
  };
}

export interface Call {
  from: string;
  to: string;
}

export const callParameterSerializer = {
  addParameters(stream: any, call: Call): void {
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
