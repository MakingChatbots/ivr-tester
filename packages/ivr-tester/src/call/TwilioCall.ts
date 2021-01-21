import ws from "ws";
import { DtmfBufferGenerator } from "./dtmf/DtmfBufferGenerator";
import { TwilioConnectionEvents } from "./twilio";
import { Call, CallEvents } from "./Call";
import { Debugger } from "../Debugger";
import { TypedEmitter } from "../Emitter";

export enum WebSocketEvents {
  Message = "message",
  Close = "close",
}

export class TwilioCall extends TypedEmitter<CallEvents> implements Call {
  private static debug = Debugger.getTwilioDebugger();

  private readonly processMessageReference: (message: string) => void;
  private readonly serverClosedConnectionReference: (
    a: number,
    b: string
  ) => void;

  private streamSid: string | undefined;

  constructor(
    private readonly connection: ws,
    private readonly dtmfGenerator: DtmfBufferGenerator
  ) {
    super();
    this.processMessageReference = this.processMessage.bind(this);
    connection.on(WebSocketEvents.Message, this.processMessageReference);

    this.serverClosedConnectionReference = this.serverClosedConnection.bind(
      this
    );
    connection.on(WebSocketEvents.Close, this.serverClosedConnectionReference);
  }

  public close(reason: string): void {
    this.closeConnection();
    this.emit("callClosed", { by: "ivr-tester", reason });
  }

  public isOpen(): boolean {
    return (
      this.connection.readyState !== this.connection.CLOSED &&
      this.connection.readyState !== this.connection.CLOSING
    );
  }

  private serverClosedConnection(): void {
    this.emit("callClosed", { by: "unknown" });
    this.closeConnection();
  }

  private closeConnection(): void {
    if (this.isOpen()) {
      this.connection.close();
    }

    this.connection.off(WebSocketEvents.Message, this.processMessageReference);
    this.connection.off(
      WebSocketEvents.Close,
      this.serverClosedConnectionReference
    );
  }

  private processMessage(message: string): void {
    const data = JSON.parse(message);

    switch (data.event) {
      case TwilioConnectionEvents.MediaStreamStart:
        TwilioCall.debug("Media stream started %O", data);

        this.streamSid = data.streamSid;
        this.connection.off(
          WebSocketEvents.Message,
          this.processMessageReference
        );
        break;
      case TwilioConnectionEvents.Mark:
        TwilioCall.debug("Mark event %O", data);
        break;
      case TwilioConnectionEvents.CallEnded:
        TwilioCall.debug("Call ended %O", data);

        this.closeConnection();
        this.emit("callClosed", { by: "caller" });
        break;
    }
  }

  public sendDtmfTone(dtmfSequence: string): void {
    this.sendMedia(
      this.dtmfGenerator.generate(dtmfSequence),
      `dtmf-${dtmfSequence}`
    );
    TwilioCall.debug(`DTMF tone for ${dtmfSequence} sent`);
  }

  public sendMedia(payload: Buffer, name?: string): void {
    if (!this.isOpen()) {
      throw new Error("Media cannot be sent as call has been closed");
    }

    if (!this.streamSid) {
      throw new Error("Stream SID must be set before media can be sent");
    }

    const message = {
      event: TwilioConnectionEvents.Media,
      streamSid: this.streamSid,
      media: {
        payload: payload.toString("base64"),
      },
    };

    this.connection.send(JSON.stringify(message));

    if (name) {
      const markMessage = {
        event: TwilioConnectionEvents.Mark,
        streamSid: this.streamSid,
        mark: {
          name,
        },
      };
      this.connection.send(JSON.stringify(markMessage));
      TwilioCall.debug("Sent media mark event %O", markMessage);
    }
  }

  public getStream(): ws {
    return this.connection;
  }
}
