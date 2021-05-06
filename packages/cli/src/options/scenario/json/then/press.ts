import Joi from "joi";
import { press, Then } from "ivr-tester";

export interface JsonThenPress {
  type: "press";
  value: string;
}

export const jsonThenPress = {
  schema: Joi.object<JsonThenPress>({
    type: Joi.valid("press").required(),
    value: Joi.string().required(),
  }),
  converter(json: JsonThenPress): Then {
    return press(json.value);
  },
};
