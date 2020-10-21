import { Then } from "./actions";
import { When } from "./matchers";

export interface TranscriptCondition {
  when: When;
  then: Then;
}
