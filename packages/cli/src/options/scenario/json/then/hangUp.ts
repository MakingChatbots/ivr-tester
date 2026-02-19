import { hangUp, type Then } from "ivr-tester";
import Joi from "joi";

const typeValue = "hangUp" as const;

export interface JsonThenHangUp {
  type: typeof typeValue;
}

export const jsonThenHangUp = {
  typeValue,
  schema: Joi.object<JsonThenHangUp>({
    type: Joi.valid(typeValue).required(),
  }),
  converter(_json: JsonThenHangUp): Then {
    return hangUp();
  },
};
