import { Then } from "./Then";
import { Call } from "../../../call/Call";

/**
 * Sends DTMF tones to the call
 * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
 */
export const press = (dtmfSequence: string): Then => ({
  do: (call: Call) => call.sendDtmfTone(dtmfSequence),
  describe: () => `press key(s) ${dtmfSequence}`,
});
