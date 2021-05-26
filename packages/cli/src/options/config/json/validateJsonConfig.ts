import Joi, { ValidationError } from "joi";
import {
  JsonConfig,
  JsonConfigRecordingAudio,
  JsonConfigRecordingTranscription,
  JsonConfigTranscriber,
} from "./JsonConfig";

const jsonTranscriberSchema = Joi.object<JsonConfigTranscriber>({
  name: Joi.string().required(),
  options: Joi.object().optional().default({}),
});

const jsonConfigSchema = Joi.object<JsonConfig>({
  localServerPort: Joi.number().port().optional().default(8080),
  transcriber: jsonTranscriberSchema.required(),
  recording: Joi.object({
    audio: Joi.object<JsonConfigRecordingAudio>({
      outputPath: Joi.string().required(),
      filename: Joi.alternatives().try(Joi.string(), Joi.function()).optional(),
    }).optional(),
    transcript: Joi.object<JsonConfigRecordingTranscription>({
      outputPath: Joi.string().required(),
      filename: Joi.alternatives().try(Joi.string(), Joi.function()).optional(),
      includeResponse: Joi.boolean().optional(),
    }).optional(),
  }).optional(),
}).required();

export const validateConfig = (
  config: unknown
): { config?: JsonConfig; error?: ValidationError } => {
  const { error, value } = jsonConfigSchema.validate(config, {
    presence: "required",
  });

  if (error) {
    return { error };
  } else {
    return { config: value };
  }
};
