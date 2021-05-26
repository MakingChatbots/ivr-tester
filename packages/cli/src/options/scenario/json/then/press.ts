import Joi from "joi";
import { press, Then } from "ivr-tester";

const typeValue = "press" as const;

export interface JsonThenPress {
  type: typeof typeValue;
  value: string;
}

export const jsonThenPress = {
  typeValue,
  schema: Joi.object<JsonThenPress>({
    type: Joi.valid(typeValue).required(),
    value: Joi.string().required(),
  }),
  converter(json: JsonThenPress): Then {
    return press(json.value);
  },
};
