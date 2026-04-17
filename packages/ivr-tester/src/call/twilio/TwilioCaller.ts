import type { URL } from 'node:url';
import { type Twilio, twiml } from 'twilio';
import type ws from 'ws';
import { ArgumentUndefinedError } from '../../ArgumentUndefinedError.js';
import type { IvrNumber } from '../../configuration/call/IvrNumber.js';
import { Debugger } from '../../Debugger.js';
import type { Caller, RequestedCall } from '../Caller.js';
import type { CallStreamAdapter } from '../CallStreamAdapter.js';
import { TwilioCallStreamAdapter } from './TwilioCallStreamAdapter.js';
import type { ServerStartMessage } from './TwilioServerMessages.js';

export class TwilioCaller implements Caller<IvrNumber> {
  private static readonly debug = Debugger.getTwilioDebugger();
  private static readonly CallIdCustomerParameterKey = 'CallId';

  public constructor(private readonly twilioClient: Twilio) {
    if (!twilioClient) {
      throw new ArgumentUndefinedError('twilioClient');
    }
  }

  public callStreamReceived(callWebSocket: ws): CallStreamAdapter {
    return new TwilioCallStreamAdapter(callWebSocket);
  }

  private static addCallIdCustomParameter(
    stream: InstanceType<typeof twiml.VoiceResponse.Stream>,
    callId: string,
  ): void {
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
