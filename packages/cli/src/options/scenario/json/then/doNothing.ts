import Joi from "joi";
import { doNothing, Then } from "ivr-tester";

export interface JsonThenDoNothing {
  type: "doNothing";
}

export const jsonThenDoNothing = {
  schema: Joi.object<JsonThenDoNothing>({
    type: Joi.valid("doNothing").required(),
  }),
  converter(json: JsonThenDoNothing): Then {
    return doNothing();
  },
};
