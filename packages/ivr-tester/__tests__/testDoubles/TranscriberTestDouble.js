"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriberTestDouble = void 0;
const src_1 = require("../../src");
test.skip("ignore");
/**
 * Produces transcription events containing the JSON of the payload it is
 * meant to transcribe
 */
class TranscriberTestDouble extends src_1.TypedEmitter {
  close() {
    //Intentionally empty
  }
  transcribe(payload) {
    this.produceTranscriptionEvent(JSON.stringify(payload));
  }
  produceTranscriptionEvent(transcription) {
    const event = { transcription, isFinal: true };
    this.emit("transcription", event);
  }
  transcriptionComplete() {
    //Intentionally empty
  }
}
exports.TranscriberTestDouble = TranscriberTestDouble;
//# sourceMappingURL=TranscriberTestDouble.js.map
