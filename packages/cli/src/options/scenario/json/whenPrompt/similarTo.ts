import Joi from "joi";
import { containsSimilarTo, When } from "ivr-tester";

const typeValue = "similarTo" as const;

export interface JsonWhenPromptSimilarTo {
  type: typeof typeValue;
  value: string;
}

export const jsonWhenPromptSimilarTo = {
  typeValue,
  schema: Joi.object<JsonWhenPromptSimilarTo>({
    type: Joi.valid(typeValue).required(),
    value: Joi.string().required(),
  }),
  converter(json: JsonWhenPromptSimilarTo): When {
    return containsSimilarTo(json.value);
  },
};
