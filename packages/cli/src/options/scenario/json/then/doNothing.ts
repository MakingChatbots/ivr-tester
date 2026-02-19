import { doNothing, type Then } from "ivr-tester";
import Joi from "joi";

const typeValue = "doNothing" as const;

export interface JsonThenDoNothing {
  type: typeof typeValue;
}

export const jsonThenDoNothing = {
  typeValue,
  schema: Joi.object<JsonThenDoNothing>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(_json: JsonThenDoNothing): Then {
    return doNothing();
  },
};
