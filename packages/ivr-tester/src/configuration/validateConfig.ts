import Joi, { ValidationError } from 'joi';
import { Config } from './Config';
import { Twilio } from 'twilio';
import { TwilioClientAuth } from '../call/twilio/twilio';
import { IvrTester } from '../IvrTester';

const schema = Joi.object<Config>({
  localServerPort: Joi.number().port().optional().default(8080),
  publicServerUrl: Joi.string().uri().optional(),
  twilio: Joi.alternatives(
    Joi.object<Twilio>(),
    Joi.object<TwilioClientAuth>({
      accountSid: Joi.string().required(),
      authToken: Joi.string().required(),
    }),
  ).required(),
});

export const validateConfig = (config: Config): { config?: Config; error?: ValidationError } => {
  const { error, value } = schema.validate(config, { presence: 'required' });

  if (value.publicServerUrl) {
    value.publicServerUrl = IvrTester.convertToWebSocketUrl(value.publicServerUrl).toString();
  }

  return { config: value, error };
};
