import Joi from "joi";
import { contains, When } from "ivr-tester";

export interface JsonWhenPromptContains {
  type: "contains";
  value: string | string[];
}

export const jsonWhenPromptContains = {
  schema: Joi.object<JsonWhenPromptContains>({
    type: Joi.valid("contains").required(),
    value: Joi.alternatives()
      .try(Joi.string(), Joi.array().items(Joi.string()))
      .required(),
  }),
  converter(json: JsonWhenPromptContains): When {
    return contains(json.value);
  },
};
