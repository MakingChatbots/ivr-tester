import { Call } from "../../call/Call";
import { Emitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";

export interface CallFlowInstructions {
  startListening(transcriber: Emitter<TranscriptionEvents>, call: Call): void;
}

export interface CallFlowTest {
  // TODO Enforce that test names are defined and unique
  name: string;
  test: CallFlowInstructions;
}
