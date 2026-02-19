import type { URL } from "node:url";
import { type Twilio, twiml } from "twilio";
import type VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import type { IvrNumber } from "../configuration/call/IvrNumber";
import { Debugger } from "../Debugger";
import type { Caller, RequestedCall } from "./Caller";
import type { Call, TwilioConnectionEvents } from "./twilio";

export interface TwilioMediaStreamStartEvent {
  event: TwilioConnectionEvents.MediaStreamStart;
  streamSid: string;
  start: {
    customParameters: { from: string; to: string };
  };
}

export class TwilioCaller implements Caller<IvrNumber> {
  private static debug = Debugger.getTwilioDebugger();

  constructor(private readonly twilioClient: Twilio) {}

  private static addParameters(stream: VoiceResponse.Stream, call: Call): void {
    // TODO Adding parameters throws a warning, but is even done here https://www.twilio.com/blog/media-streams-public-beta
    stream.parameter({ name: "from", value: call.from });
    stream.parameter({ name: "to", value: call.to });
  }

  public static extractParameters(event: TwilioMediaStreamStartEvent): Call {
    const from = event?.start?.customParameters?.from;
    const to = event?.start?.customParameters?.to;

    if (!from || !to) {
      throw new Error(
        "Start Media event does not contain from/to custom parameters",
      );
    }

    return { from, to };
  }

  public async call(
    call: IvrNumber,
    streamUrl: URL | string,
  ): Promise<RequestedCall> {
    const response = new twiml.VoiceResponse();
    const connect = response.connect();
    const stream = connect.stream({
      url: streamUrl.toString(),
    });

    TwilioCaller.addParameters(stream, call);
    const callOptions = {
      twiml: response.toString(),
      ...call,
    };

    TwilioCaller.debug("Making call %O", callOptions);

    await this.twilioClient.calls.create(callOptions);
    return { type: "telephony", call };
  }
}
