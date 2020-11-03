import { Then } from "./then";
import { When } from "./when";

export interface TranscriptCondition {
  whenTranscript: When;
  then: Then;
}
