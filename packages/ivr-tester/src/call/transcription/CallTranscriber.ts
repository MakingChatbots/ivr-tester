import { WebSocketEvents } from "../TwilioCall";
import { TwilioConnectionEvents } from "../twilio";
import { TranscriberPlugin, TranscriptEvent } from "./plugin/TranscriberPlugin";
import { Debugger } from "../../Debugger";
import { TypedEmitter } from "../../Emitter";
import { Call } from "../Call";
import { PromptTranscriptionBuilder } from "./PromptTranscriptionBuilder";

export interface PromptTranscriptionEvent {
  transcription: string;
}

export type CallTranscriptionEvents = {
  transcription: PromptTranscriptionEvent;
};

export class CallTranscriber extends TypedEmitter<CallTranscriptionEvents> {
  private static debug = Debugger.getPackageDebugger();

  private readonly processMessageRef: (message: string) => void;
  private readonly closeRef: () => void;

  constructor(
    private readonly call: Call,
    private readonly transcriber: TranscriberPlugin,
    private readonly promptTranscriptionBuilder: PromptTranscriptionBuilder = new PromptTranscriptionBuilder()
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

  private saveAndEmitPartialTranscript() {
    const partialTranscript = this.promptTranscriptionBuilder.merge();
    CallTranscriber.debug("Transcript: %s", partialTranscript);

    const event: PromptTranscriptionEvent = {
      transcription: partialTranscript,
    };
    this.emit("transcription", event);
  }

  private collects(event: TranscriptEvent) {
    this.promptTranscriptionBuilder.add(event);
    this.saveAndEmitPartialTranscript();
  }
}
