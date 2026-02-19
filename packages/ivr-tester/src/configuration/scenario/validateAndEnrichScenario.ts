import Joi, { type ValidationError } from "joi";
import type { Then } from "../../testing/test/conditions/then";
import type { Scenario } from "./Scenario";
import type { Step } from "./Step";

const scenarioSchema = Joi.object<Scenario>({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object<Step>({
      whenPrompt: Joi.function().required(),
      then: Joi.object<Then>().required(),
      silenceAfterPrompt: Joi.number().required(),
      timeout: Joi.number().required(),
    }),
  ),
}).required();

const schema = Joi.array().items(scenarioSchema).unique("name");

export const validateAndEnrichScenario = (
  scenario: Scenario | Scenario[],
): { scenarios?: Scenario[]; error?: ValidationError } => {
  const scenarios = Array.isArray(scenario) ? scenario : [scenario];

  const { error, value } = schema.validate(scenarios, {
    presence: "required",
  });

  return { scenarios: value, error };
};
