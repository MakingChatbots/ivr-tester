/// <reference types="node" />
import {
  TranscriberPlugin,
  TranscriptionEvents,
  TypedEmitter,
} from "../../src";
/**
 * Produces transcription events containing the JSON of the payload it is
 * meant to transcribe
 */
export declare class TranscriberTestDouble
  extends TypedEmitter<TranscriptionEvents>
  implements TranscriberPlugin {
  close(): void;
  transcribe(payload: Buffer): void;
  private produceTranscriptionEvent;
  transcriptionComplete(): void;
}
