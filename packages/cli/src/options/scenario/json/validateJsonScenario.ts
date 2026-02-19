import Joi, { type ValidationError } from "joi";
import type { JsonScenario, JsonStep } from "./jsonScenario";
import { jsonThenDoNothing } from "./then/doNothing";
import { jsonThenHangUp } from "./then/hangUp";
import { jsonThenPress } from "./then/press";
import { jsonWhenPromptAnd } from "./whenPrompt/and";
import { jsonWhenPromptContains } from "./whenPrompt/contains";
import { jsonWhenPromptContainsSimilarTo } from "./whenPrompt/containsSimilarTo";
import { jsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import { jsonWhenPromptOr } from "./whenPrompt/or";
import { jsonWhenPromptSimilarTo } from "./whenPrompt/similarTo";

const jsonScenarioSchema = Joi.object<JsonScenario>({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object<JsonStep>({
      whenPrompt: Joi.alternatives()
        .try(
          jsonWhenPromptIsAnything.schema,
          jsonWhenPromptContains.schema,
          jsonWhenPromptContainsSimilarTo.schema,
          jsonWhenPromptSimilarTo.schema,
          jsonWhenPromptOr.schema,
          jsonWhenPromptAnd.schema,
        )
        .required(),
      then: Joi.alternatives()
        .try(
          jsonThenDoNothing.schema,
          jsonThenPress.schema,
          jsonThenHangUp.schema,
        )
        .required(),
      silenceAfterPrompt: Joi.number().required(),
      timeout: Joi.number().required(),
    }),
  ),
}).required();

export const validateScenario = (
  scenario: unknown,
): { scenario?: JsonScenario; error?: ValidationError } => {
  const { error, value } = jsonScenarioSchema.validate(scenario, {
    presence: "required",
  });

  if (error) {
    return { error };
  } else {
    return { scenario: value };
  }
};
