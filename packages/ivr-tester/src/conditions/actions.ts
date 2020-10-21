import { Call } from "../handlers/ordered";

/**
 * An action performed when a condition is met
 */
export interface Then {
  /**
   * Returns a description of this action e.g. "press the keys 123#"
   *
   * When thinking of the wording keep in mind that in the logs this
   * description follows the word 'Then' e.g. "Then press the keys 123#".
   */
  describe(): string;

  do(call: Call): void;
}

export const press = (dtmfSequence: string): Then => ({
  do: (call: Call) => call.sendDtmfTone(dtmfSequence),
  describe: () => `press key(s) ${dtmfSequence}`,
});

export const doNothing = (): Then => ({
  do: () => {},
  describe: () => `do nothing`,
});
