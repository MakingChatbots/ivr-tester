import { Then } from "../../testing/test/conditions/then";
import { When } from "../../testing/test/conditions/when";

/**
 * Performs an assertion when a prompt has been transcribed.
 */
export interface Step {
  /**
   * Assertion to perform against the transcription of a prompt
   */
  readonly whenPrompt: When;

  /**
   * Action to perform following a successful assertion
   */
  readonly then: Then;

  /**
   * Milliseconds of silence expected after the prompt has been matched before concluding the prompt has ended.
   */
  readonly silenceAfterPrompt: number;

  /**
   * Amount of time a prompt should wait for a match before timing out.
   */
  readonly timeout: number;
}
