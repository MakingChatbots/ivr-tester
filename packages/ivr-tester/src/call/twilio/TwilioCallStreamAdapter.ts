import type ws from 'ws';
import { Debugger } from '../../Debugger.js';
import { TypedEmitter } from '../../Emitter.js';
import { type CallEvents, type CallStreamAdapter, WebSocketEvents } from '../CallStreamAdapter.js';
import { TwilioCaller } from './TwilioCaller.js';
import {
  type ClientMarkMessage,
  type ClientMediaMessage,
  TwilioClientMessageEventTypes,
} from './TwilioClientMessages.js';
import { TwilioServerMessageEventTypes, type TwilioServerMessages } from './TwilioServerMessages.js';

export class TwilioCallStreamAdapter extends TypedEmitter<CallEvents> implements CallStreamAdapter {
  private static readonly debug = Debugger.getTwilioDebugger();

  private readonly processMessageReference: (message: string) => void;
  private readonly serverClosedConnectionReference: (a: number, b: string) => void;

  private streamSid: string | undefined;

  constructor(private readonly connection: ws) {
    super();
    this.processMessageReference = this.processMessage.bind(this);
    connection.on(WebSocketEvents.Message, this.processMessageReference);

    this.serverClosedConnectionReference = this.serverClosedConnection.bind(this);
    connection.on(WebSocketEvents.Close, this.serverClosedConnectionReference);
  }

  public close(reason: string): void {
    this.closeConnection();
    this.emit('callClosed', { by: 'ivr-tester', reason });
  }

  public isOpen(): boolean {
    return (
      this.connection.readyState !== this.connection.CLOSED &&
      this.connection.readyState !== this.connection.CLOSING
    );
  }

  private serverClosedConnection(): void {
    this.emit('callClosed', { by: 'unknown' });
    this.closeConnection();
  }

  private closeConnection(): void {
    if (this.isOpen()) {
      this.connection.close();
    }

    this.connection.off(WebSocketEvents.Message, this.processMessageReference);
    this.connection.off(WebSocketEvents.Close, this.serverClosedConnectionReference);
  }

  private processMessage(message: string): void {
    const data = JSON.parse(message) as TwilioServerMessages;

    switch (data.event) {
      case TwilioServerMessageEventTypes.Start:
        try {
          TwilioCallStreamAdapter.debug('Media stream started %O', data);

          const callId = TwilioCaller.extractRoutingIdCustomParameter(data);

          this.streamSid = data.streamSid;
          this.emit('callMediaStreamStarted', {
            streamSid: this.streamSid,
            callId,
          });
        } catch (err) {
          this.closeConnection();
          this.emit('callClosed', {
            by: 'ivr-tester',
            reason: 'Failed to extract stream parameters',
          });
          throw err;
        }
        break;
      case TwilioServerMessageEventTypes.Mark:
        TwilioCallStreamAdapter.debug('Mark event %O', data);
        break;
      case TwilioServerMessageEventTypes.Stop:
        TwilioCallStreamAdapter.debug('Call ended %O', data);

        this.closeConnection();
        this.emit('callClosed', { by: 'caller' });
        break;
    }
  }

  public sendMedia(payload: Buffer, name?: string): void {
    if (!this.isOpen()) {
      throw new Error('Media cannot be sent as call has been closed');
    }

    if (!this.streamSid) {
      throw new Error('Stream SID must be set before media can be sent');
    }

    const message: ClientMediaMessage = {
      event: TwilioClientMessageEventTypes.Media,
      streamSid: this.streamSid,
      media: {
        payload: payload.toString('base64'),
      },
    };

    this.connection.send(JSON.stringify(message));
    TwilioCallStreamAdapter.debug('Sent media to call', {
      name: name ? name : '',
    });

    if (name) {
      const markMessage: ClientMarkMessage = {
        event: TwilioClientMessageEventTypes.Mark,
        streamSid: this.streamSid,
        mark: {
          name,
        },
      };
      this.connection.send(JSON.stringify(markMessage));
      TwilioCallStreamAdapter.debug('Sent media mark event %O', markMessage);
    }
  }

  public getStream(): ws {
    return this.connection;
  }
}
