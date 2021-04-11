import Joi, { ValidationError } from "joi";
import { JsonScenario, JsonStep, JsonThen, JsonWhen } from "./jsonScenario";

const jsonScenarioSchema = Joi.object<JsonScenario>({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object<JsonStep>({
      whenPrompt: Joi.object<JsonWhen>({
        type: Joi.string().required(),
        value: Joi.string().optional(),
      }).required(),
      then: Joi.object<JsonThen>({
        type: Joi.string().required(),
        value: Joi.string().optional(),
      }).required(),
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

  return { scenario: value, error };
};
