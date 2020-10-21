import { TranscriptCondition } from "../conditions/TranscriptCondition";
import { TestContainer, TestResult } from "./TestHandler";

export interface Call {
  sendDtmfTone(dtmfSequence: string): void;
  sendMedia(buffer: Buffer): void;
}

export const ordered: (
  conditions: ReadonlyArray<TranscriptCondition>
) => TestContainer = (conditions) => {
  let nextConditionIndex: number = 0;

  const clonedConditions = Array.isArray(conditions) ? [...conditions] : [];

  return {
    test(transcript, call): TestResult {
      const condition = clonedConditions[nextConditionIndex];
      if (!condition) {
        return { result: "pass" };
      }

      const isMatch = condition.when.check(transcript);
      if (!isMatch) {
        return { result: "fail" };
      }

      condition.then.do(call);

      nextConditionIndex++;

      const isLastCondition = !clonedConditions[nextConditionIndex];

      return {
        matchedCondition: condition,
        result: isLastCondition ? "pass" : "continue",
      };
    },
  };
};
