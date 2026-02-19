import { contains, type When } from "ivr-tester";
import Joi from "joi";

const typeValue = "contains" as const;

export interface JsonWhenPromptContains {
  type: typeof typeValue;
  value: string;
}

export const jsonWhenPromptContains = {
  typeValue,
  schema: Joi.object<JsonWhenPromptContains>({
    type: Joi.valid(typeValue).required(),
    value: Joi.string().required(),
  }),
  converter(json: JsonWhenPromptContains): When {
    return contains(json.value);
  },
};
