import { Call } from "../../call/Call";
import { Emitter, TypedEmitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { CallTranscriptionEvents } from "../../call/transcription/CallTranscriber";

export interface CallFlowInstructions {
  startListening(
    transcriber: Emitter<CallTranscriptionEvents>,
    call: Call
  ): void;
}

export interface CallFlowTest {
  // TODO Enforce that test names are defined and unique
  name: string;
  test: CallFlowInstructions;
}
