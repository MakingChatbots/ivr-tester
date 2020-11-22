import { Then } from "./Then";
import { Call } from "../../../call/Call";

/**
 * Sends DTMF tones to the call
 */
export const press = (dtmfSequence: string): Then => ({
  do: (call: Call) => call.sendDtmfTone(dtmfSequence),
  describe: () => `press key(s) ${dtmfSequence}`,
});
