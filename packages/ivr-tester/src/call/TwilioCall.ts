import ws from "ws";
import { DtmfBufferGenerator } from "./dtmf/DtmfBufferGenerator";
import { TwilioConnectionEvents } from "./twilio";
import { Call } from "./Call";

/** @internal */
export enum WebSocketEvents {
  Message = "message",
  Close = "close",
}

/** @internal */
export class TwilioCall implements Call {
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

    // Add debug output for all from https://www.twilio.com/blog/multiple-twilio-streams-javascript
    if (data.event === TwilioConnectionEvents.MediaStreamStart) {
      this.streamSid = data.streamSid;
      this.connection.off(
        WebSocketEvents.Message,
        this.processMessageReference
      );
    }
  }

  public sendDtmfTone(dtmfSequence: string): void {
    this.sendMedia(this.dtmfGenerator.generate(dtmfSequence));
  }

  public sendMedia(payload: Buffer): void {
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
  }

  public getStream(): ws {
    return this.connection;
  }
}
