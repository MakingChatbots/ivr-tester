import Joi from "joi";
import { hangUp, Then } from "ivr-tester";

const typeValue = "hangUp" as const;

export interface JsonThenHangUp {
  type: typeof typeValue;
}

export const jsonThenHangUp = {
  typeValue,
  schema: Joi.object<JsonThenHangUp>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(json: JsonThenHangUp): Then {
    return hangUp();
  },
};
