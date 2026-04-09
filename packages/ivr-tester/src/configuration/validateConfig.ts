import Joi, { type ValidationError } from 'joi';
import type { Caller } from '../call/Caller';
import { IvrTester } from '../IvrTester';
import type { Config } from './Config';
import type { IvrNumber } from './call/IvrNumber';

const schema = Joi.object<Config>({
  localServerPort: Joi.number().port().optional().default(8080),
  publicServerUrl: Joi.string().uri().optional(),
  caller: Joi.object<Caller<IvrNumber | Buffer>>().required(),
});

export const validateConfig = (config: Config): { config?: Config; error?: ValidationError } => {
  const { error, value } = schema.validate(config, { presence: 'required' });

  if (value.publicServerUrl) {
    value.publicServerUrl = IvrTester.convertToWebSocketUrl(value.publicServerUrl).toString();
  }

  return { config: value, error };
};
