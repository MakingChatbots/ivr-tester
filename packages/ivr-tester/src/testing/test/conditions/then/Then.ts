import { Call } from "../../../../call/Call";

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

  /**
   * Performs the action to the call
   */
  do(call: Call): void;
}
