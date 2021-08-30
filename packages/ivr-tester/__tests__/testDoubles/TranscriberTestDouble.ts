import {
  TranscriberPlugin,
  TranscriptEvent,
  TranscriptionEvents,
  TypedEmitter,
} from "../../src";

/**
 * Produces transcription events containing the JSON of the payload it is
 * meant to transcribe
 */
export class TranscriberTestDouble
  extends TypedEmitter<TranscriptionEvents>
  implements TranscriberPlugin {
  public close(): void {
    //Intentionally empty
  }

  public transcribe(payload: Buffer): void {
    this.produceTranscriptionEvent(JSON.stringify(payload));
  }

  private produceTranscriptionEvent(transcription: string) {
    const event: TranscriptEvent = { transcription, isFinal: true };
    this.emit("transcription", event);
  }

  public transcriptionComplete(): void {
    //Intentionally empty
  }
}
