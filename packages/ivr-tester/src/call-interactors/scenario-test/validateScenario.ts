import Joi, { type ValidationError } from 'joi';
import type { Scenario } from './scenario-definition/Scenario.js';
import type { Step } from './scenario-definition/Step.js';
import type { Then } from './scenario-definition/then/index.js';

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
