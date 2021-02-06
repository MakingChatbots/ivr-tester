import { Then } from "./Then";
import { Call } from "../../../../call/Call";

/**
 * Sends DTMF tones to the call
 * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
 */
export const press = (dtmfSequence: string): Then => ({
  do: (call: Call) => Promise.resolve(call.sendDtmfTone(dtmfSequence)),
  describe: () => {
    return dtmfSequence.length === 1
      ? `press key ${dtmfSequence}`
      : `press keys ${dtmfSequence}`;
  },
});
