import { Then } from "./then";
import { When } from "./when";

/**
 * Performs an assertion when a prompt has been transcribed.
 */
export interface AssertThen {
  /**
   * Assertion to perform against the transcription of a prompt
   */
  whenPrompt: When;

  /**
   * Action to perform following a successful assertion
   */
  then: Then;
}
