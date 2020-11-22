import { Config } from "../configuration/Config";
import { TestSubject } from "../handlers/TestHandler";
import { URL } from "url";
import { Twilio, twiml } from "twilio";
import { Call, TwilioConnectionEvents } from "./twilio";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export interface TwilioMediaStreamStartEvent {
  event: TwilioConnectionEvents.MediaStreamStart;
  streamSid: string;
  start: {
    customParameters: { from: string; to: string };
  };
}

export class IvrCaller {
  constructor(private readonly twilioClient?: Twilio) {}

  private static addParameters(stream: VoiceResponse.Stream, call: Call): void {
    stream.parameter({ name: "from", value: call.from });
    stream.parameter({ name: "to", value: call.to });
  }

  public static extractParameters(event: TwilioMediaStreamStartEvent): Call {
    const from = event?.start?.customParameters?.from;
    const to = event?.start?.customParameters?.to;

    if (!from || !to) {
      throw new Error(
        "Start Media event does not contain from/to custom parameters"
      );
    }

    return { from, to };
  }

  public call(call: TestSubject, streamUrl: URL | string): Promise<any> {
    const response = new twiml.VoiceResponse();
    const connect = response.connect();
    const stream = connect.stream({ url: streamUrl.toString() });

    IvrCaller.addParameters(stream, call);

    return this.twilioClient.calls.create({
      twiml: response.toString(),
      ...call,
    });
  }
}
