import ws from "ws";
import { EventEmitter } from "events";
import { Transcriber, TranscriptEvent } from "../plugins/Transcriber";
import { WebSocketEvents } from "./TwilioCall";
import { TwilioConnectionEvents } from "../twilio";

export class TranscriptionHandler extends EventEmitter {
  private static readonly TRANSCRIPTION_EVENT = "transcription";

  constructor(
    private readonly connection: ws,
    private readonly transcriber: Transcriber
  ) {
    super();
    connection.on(WebSocketEvents.Message, this.processMessage.bind(this));
    connection.on(WebSocketEvents.Close, this.close.bind(this));
    transcriber.on(
      TranscriptionHandler.TRANSCRIPTION_EVENT,
      this.processTranscript.bind(this)
    );
  }

  private processTranscript(event: TranscriptEvent) {
    this.emit(TranscriptionHandler.TRANSCRIPTION_EVENT, event);
  }

  private processMessage(message: string) {
    const data = JSON.parse(message);
    switch (data.event) {
      case TwilioConnectionEvents.Media:
        this.transcriber.transcribe(data.media.payload);
        break;
      case TwilioConnectionEvents.CallEnded:
        this.close();
        break;
    }
  }

  private close() {
    this.connection.off(WebSocketEvents.Message, this.processMessage);
    this.connection.off(TwilioConnectionEvents.CallEnded, this.close);

    this.transcriber.close();
  }
}
