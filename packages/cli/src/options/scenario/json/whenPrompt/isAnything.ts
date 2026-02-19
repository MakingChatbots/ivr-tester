import { isAnything, type When } from "ivr-tester";
import Joi from "joi";

const typeValue = "isAnything" as const;

export interface JsonWhenPromptIsAnything {
  type: typeof typeValue;
}

export const jsonWhenPromptIsAnything = {
  typeValue,
  schema: Joi.object<JsonWhenPromptIsAnything>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(_json: JsonWhenPromptIsAnything): When {
    return isAnything();
  },
};
