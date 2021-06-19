import Joi from "joi";
import { containsSimilarTo, When } from "ivr-tester";

const typeValue = "containsSimilarTo" as const;

export interface JsonWhenPromptContainsSimilarTo {
  type: typeof typeValue;
  value: string;
  threshold?: number;
}

export const jsonWhenPromptContainsSimilarTo = {
  typeValue,
  schema: Joi.object<JsonWhenPromptContainsSimilarTo>({
    type: Joi.valid(typeValue).required(),
    value: Joi.string().required(),
    threshold: Joi.number().default(0.8).optional(),
  }),
  converter(json: JsonWhenPromptContainsSimilarTo): When {
    return containsSimilarTo(json.value, json.threshold);
  },
};
