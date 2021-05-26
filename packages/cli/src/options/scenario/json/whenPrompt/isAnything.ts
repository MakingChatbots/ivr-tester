import Joi from "joi";
import { isAnything, When } from "ivr-tester";

const typeValue = "isAnything" as const;

export interface JsonWhenPromptIsAnything {
  type: typeof typeValue;
}

export const jsonWhenPromptIsAnything = {
  typeValue,
  schema: Joi.object<JsonWhenPromptIsAnything>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(json: JsonWhenPromptIsAnything): When {
    return isAnything();
  },
};
