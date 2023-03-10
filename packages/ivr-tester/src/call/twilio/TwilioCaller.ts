import { URL } from 'url';
import { Twilio, twiml } from 'twilio';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { Debugger } from '../../Debugger';
import { Caller, RequestedCall } from '../Caller';
import { IvrNumber } from '../../configuration/call/IvrNumber';
import { ArgumentUndefinedError } from '../../ArgumentUndefinedError';
import { ServerStartMessage } from './TwilioServerMessages';

export class TwilioCaller implements Caller<IvrNumber> {
  private static debug = Debugger.getTwilioDebugger();
  private static CallIdCustomerParameterKey = 'CallId';

  constructor(private readonly twilioClient: Twilio) {
    if (!twilioClient) {
      throw new ArgumentUndefinedError('twilioClient');
    }
  }

  private static addCallIdCustomParameter(stream: VoiceResponse.Stream, callId: string): void {
    // TODO Adding parameters throws a warning, but is even done here https://www.twilio.com/blog/media-streams-public-beta
    stream.parameter({ name: TwilioCaller.CallIdCustomerParameterKey, value: callId });
  }

  public static extractRoutingIdCustomParameter(event: ServerStartMessage): string {
    const callId = event?.start?.customParameters?.[TwilioCaller.CallIdCustomerParameterKey];
    if (!callId) {
      throw new Error('Start Media event does not contain call ID custom parameter');
    }

    return callId;
  }

  public async call(
    call: IvrNumber,
    streamUrl: URL | string,
    callId: string,
  ): Promise<RequestedCall> {
    const response = new twiml.VoiceResponse();
    const connect = response.connect();
    const stream = connect.stream({
      url: streamUrl.toString(),
    });

    TwilioCaller.addCallIdCustomParameter(stream, callId);
    const callOptions = {
      twiml: response.toString(),
      ...call,
    };

    TwilioCaller.debug('Making call %O', callOptions);

    await this.twilioClient.calls.create(callOptions);
    return { type: 'telephony', call };
  }
}
