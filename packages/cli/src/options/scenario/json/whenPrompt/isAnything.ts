import Joi from "joi";
import { isAnything, When } from "ivr-tester";

export interface JsonWhenPromptIsAnything {
  type: "isAnything";
}

export const jsonWhenPromptIsAnything = {
  schema: Joi.object<JsonWhenPromptIsAnything>({
    type: Joi.valid("isAnything").required(),
  }),
  converter(json: JsonWhenPromptIsAnything): When {
    return isAnything();
  },
};
