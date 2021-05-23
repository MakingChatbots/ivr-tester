import Joi from "joi";
import { doNothing, Then } from "ivr-tester";

const typeValue = "doNothing" as const;

export interface JsonThenDoNothing {
  type: typeof typeValue;
}

export const jsonThenDoNothing = {
  typeValue,
  schema: Joi.object<JsonThenDoNothing>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(json: JsonThenDoNothing): Then {
    return doNothing();
  },
};
