import ws from "ws";
import { DtmfBufferGenerator } from "./dtmf/DtmfBufferGenerator";
import { TwilioConnectionEvents } from "./twilio";
import { Call } from "./Call";
import { Debugger } from "../Debugger";

/** @internal */
export enum WebSocketEvents {
  Message = "message",
  Close = "close",
}

/** @internal */
export class TwilioCall implements Call {
  private static debug = Debugger.getTwilioDebugger();

  private readonly processMessageReference: (message: string) => void;

  private streamSid: string | undefined;
  private hasHungUp = false;

  constructor(
    private readonly connection: ws,
    private readonly dtmfGenerator: DtmfBufferGenerator
  ) {
    this.processMessageReference = this.processMessage.bind(this);
    connection.on(WebSocketEvents.Message, this.processMessageReference);
  }

  public hangUp(): void {
    this.hasHungUp = true;
    this.connection.close();
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
    if (this.hasHungUp) {
      throw new Error("Call hanged-up");
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
