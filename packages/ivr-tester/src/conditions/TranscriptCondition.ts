import { Then } from "./then";
import { When } from "./when";

export interface TranscriptCondition {
  when: When;
  then: Then;
}
