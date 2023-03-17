import { Scenario } from './scenario-definition/Scenario';
import Joi, { ValidationError } from 'joi';
import { Step } from './scenario-definition/Step';
import { Then } from './scenario-definition/then';

const schema = Joi.object<Scenario>({
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

export const validateScenario = (
  scenario: Scenario,
): { scenario?: Scenario; error?: ValidationError } => {
  const { error, value } = schema.validate(scenario, {
    presence: 'required',
  });

  return { scenario: value, error };
};
