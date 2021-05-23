import Joi, { ValidationError } from "joi";
import { JsonScenario, JsonStep } from "./jsonScenario";
import { jsonWhenPromptContains } from "./whenPrompt/contains";
import { jsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import { jsonThenDoNothing } from "./then/doNothing";
import { jsonThenPress } from "./then/press";
import { jsonThenHangUp } from "./then/hangUp";

const jsonScenarioSchema = Joi.object<JsonScenario>({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object<JsonStep>({
      whenPrompt: Joi.alternatives()
        .try(jsonWhenPromptIsAnything.schema, jsonWhenPromptContains.schema)
        .required(),
      then: Joi.alternatives()
        .try(
          jsonThenDoNothing.schema,
          jsonThenPress.schema,
          jsonThenHangUp.schema
        )
        .required(),
      silenceAfterPrompt: Joi.number().required(),
      timeout: Joi.number().required(),
    })
  ),
}).required();

export const validateScenario = (
  scenario: unknown
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
