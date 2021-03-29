import Joi, { ValidationError } from "joi";
import { Scenario } from "./Scenario";
import { Step } from "./Step";
import { Then } from "../../testing/test/conditions/then";

const scenarioSchema = Joi.object<Scenario>({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object<Step>({
      whenPrompt: Joi.function().required(),
      then: Joi.object<Then>().required(),
      silenceAfterPrompt: Joi.number().required(),
      timeout: Joi.number().required(),
    })
  ),
}).required();

const schema = Joi.array().items(scenarioSchema).unique("name");

export const validateAndEnrichScenario = (
  scenario: Scenario | Scenario[]
): { scenarios?: Scenario[]; error?: ValidationError } => {
  const scenarios = Array.isArray(scenario) ? scenario : [scenario];

  const { error, value } = schema.validate(scenarios, {
    presence: "required",
  });

  return { scenarios: value, error };
};
