import { Then } from "./Then";
import { Call } from "../../../../call/Call";

export interface PressConfig {
  /**
   * By default 'press' will automatically insert a
   * 0.5 pause between keys (except where a pause already exists)
   * to increase the chance of the tone being picked up by the
   * IVR Flow.
   *
   * This config key disables that behaviour.
   */
  disableAutomaticSlowdown?: boolean;
}

const separateWithPauses = (dtmfSequence: string): string => {
  const characters = [...dtmfSequence];

  let pausedSequence = "";
  characters.forEach((char, index) => {
    pausedSequence += char;

    const nextChar = characters[index + 1];
    if (char !== "w" && nextChar !== "w" && nextChar !== undefined) {
      pausedSequence += "w";
    }
  });

  return pausedSequence;
};

/**
 * Sends DTMF tones to the call
 * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
 * @param disableAutomaticSlowdown - Configuration
 */
export const press = (
  dtmfSequence: string,
  { disableAutomaticSlowdown = false }: PressConfig = {}
): Then => ({
  do: (call: Call) => {
    const sequence = disableAutomaticSlowdown
      ? dtmfSequence
      : separateWithPauses(dtmfSequence);

    call.sendDtmfTone(sequence);
  },
  describe: () => {
    return dtmfSequence.length === 1
      ? `press key ${dtmfSequence}`
      : `press keys ${dtmfSequence}`;
  },
});
