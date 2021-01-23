import { Then } from "./then";
import { When } from "./when";

/**
 * Performs an assertion, known as a 'when'. If correct then performs the action, known as a 'then'.
 */
export interface AssertThen {
  whenTranscript: When;
  then: Then;
}
