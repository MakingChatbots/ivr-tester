import { PromptDefinition } from "./conditions/PromptDefinition";
import { TestResult } from "./TestInstanceClass";
import { TestContainer } from "./IvrTest";

/**
 * Executes {@link PromptDefinition}'s in order
 */
export const inOrder: (
  conditions: ReadonlyArray<PromptDefinition>
) => TestContainer = (conditions) => {
  let nextConditionIndex = 0;

  const clonedConditions = Array.isArray(conditions) ? [...conditions] : [];

  return {
    test(transcript, call): TestResult {
      const condition = clonedConditions[nextConditionIndex];
      if (!condition) {
        return { result: "pass" };
      }

      const isMatch = condition.whenPrompt(transcript);
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
