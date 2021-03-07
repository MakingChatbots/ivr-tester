import { WebSocketEvents } from "../TwilioCall";
import { TwilioConnectionEvents } from "../twilio";
import {
  TranscriberPlugin,
  TranscriptEvent,
  TranscriptionEvents,
} from "./plugin/TranscriberPlugin";
import { Debugger } from "../../Debugger";
import { TypedEmitter } from "../../Emitter";
import { Call } from "../Call";

export class CallTranscriber extends TypedEmitter<TranscriptionEvents> {
  private static debug = Debugger.getPackageDebugger();

  private readonly processMessageRef: (message: string) => void;
  private readonly closeRef: () => void;

  constructor(
    private readonly call: Call,
    private readonly transcriber: TranscriberPlugin
  ) {
    super();
    this.processMessageRef = this.processMessage.bind(this);
    this.closeRef = this.close.bind(this);
    call
      .getStream()
      .on(WebSocketEvents.Message, this.processMessageRef)
      .on(WebSocketEvents.Close, this.closeRef);

    transcriber.on("transcription", this.collects.bind(this));
  }

  private processMessage(message: string) {
    const data = JSON.parse(message);
    switch (data.event) {
      case TwilioConnectionEvents.Media:
        this.transcriber.transcribe(Buffer.from(data.media.payload, "base64"));
        break;
    }
  }

  private close() {
    this.call
      .getStream()
      .off(WebSocketEvents.Message, this.processMessageRef)
      .off(WebSocketEvents.Close, this.closeRef);

    this.transcriber.close();
  }

  private collects(event: TranscriptEvent) {
    CallTranscriber.debug("Transcript: %s", event.transcription);

    this.emit("transcription", event);
  }
}
