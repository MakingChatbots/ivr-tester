import { Call } from "./inOrder";
import ws from "ws";
import { DtmfBufferGenerator } from "../dtmf/DtmfPlayer";
import { TwilioConnectionEvents } from "../twilio";

export enum WebSocketEvents {
  // eslint-disable-next-line no-unused-vars
  Message = "message",
  // eslint-disable-next-line no-unused-vars
  Close = "close",
}

export class TwilioCall implements Call {
  readonly #processMessageReference: (event: any) => void;

  #streamSid: string | undefined;

  constructor(
    private readonly connection: ws,
    private readonly dtmfGenerator: DtmfBufferGenerator
  ) {
    this.#processMessageReference = this.processMessage.bind(this);
    connection.on(WebSocketEvents.Message, this.#processMessageReference);
  }

  private processMessage(message: string) {
    const data = JSON.parse(message);

    // Add debug output for all from https://www.twilio.com/blog/multiple-twilio-streams-javascript
    if (data.event === TwilioConnectionEvents.MediaStreamStart) {
      this.#streamSid = data.streamSid;
      this.connection.off(
        WebSocketEvents.Message,
        this.#processMessageReference
      );
    }
  }

  public sendDtmfTone(dtmfSequence: string): void {
    this.sendMedia(this.dtmfGenerator.generate(dtmfSequence));
  }

  public sendMedia(payload: Buffer): void {
    if (!this.#streamSid) {
      throw new Error("Stream SID must be set before media can be sent");
    }

    const message = {
      event: TwilioConnectionEvents.Media,
      streamSid: this.#streamSid,
      media: {
        payload: payload.toString("base64"),
      },
    };

    this.connection.send(JSON.stringify(message));
  }
}
