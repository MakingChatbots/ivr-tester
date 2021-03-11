import { Then } from "./Then";
import { Call } from "../../../../call/Call";
import { dtmfSequenceValidator } from "../../../../call/dtmf/dtmfSequenceUtils";

/**
 * Sends DTMF tones to the call
 * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
 */
export const press = (dtmfSequence: string): Then => {
  dtmfSequence = dtmfSequence.toLocaleLowerCase();

  const validationResults = dtmfSequenceValidator(dtmfSequence);
  if (validationResults.valid === false) {
    throw new Error(validationResults.reason);
  }

  return {
    do: (call: Call) => call.sendDtmfTone(dtmfSequence),
    describe: () => {
      return dtmfSequence.length === 1
        ? `press key ${dtmfSequence}`
        : `press keys ${dtmfSequence}`;
    },
  };
};
