import Joi, { ValidationError } from "joi";
import { Config } from "./Config";
import { TwilioCallServer } from "../testing/TwilioCallServer";
import { Twilio } from "twilio";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { UlawDtmfBufferGenerator } from "../call/dtmf/UlawDtmfBufferGenerator";
import { TwilioClientFactory } from "../call/twilio";

const defaultTwilioFactory: TwilioClientFactory = (auth) =>
  new Twilio(auth.accountSid, auth.authToken);

const thirtySeconds = 30 * 1000;

const schema = Joi.object<Config>({
  dtmfGenerator: Joi.object<DtmfBufferGenerator>()
    .optional()
    .default(() => new UlawDtmfBufferGenerator()),
  transcriber: Joi.object<DtmfBufferGenerator>().required(),
  localServerPort: Joi.number().port().optional().default(8080),
  publicServerUrl: Joi.string().uri().optional(),
  twilioAuth: Joi.object({
    accountSid: Joi.string().required(),
    authToken: Joi.string().required(),
  }).required(),
  twilioClientFactory: Joi.function()
    .optional()
    .default(() => defaultTwilioFactory),
  msTimeoutWaitingForCall: Joi.number().optional().default(thirtySeconds),
  recording: Joi.object<Config["recording"]>({
    audio: Joi.object<Config["recording"]["audio"]>({
      outputPath: Joi.string().required(),
      filename: Joi.valid(Joi.string(), Joi.function()).optional(),
    }).optional(),
    transcript: Joi.object<Config["recording"]["transcript"]>({
      outputPath: Joi.string().required(),
      filename: Joi.valid(Joi.string(), Joi.function()).optional(),
      includeResponse: Joi.boolean().optional().default(false),
    }).optional(),
  }).optional(),
});

export const validateConfig = (
  config: Config
): { config?: Config; error?: ValidationError } => {
  const { error, value } = schema.validate(config, { presence: "required" });

  if (value.publicServerUrl) {
    value.publicServerUrl = TwilioCallServer.convertToWebSocketUrl(
      value.publicServerUrl
    ).toString();
  }

  return { config: value, error };
};
