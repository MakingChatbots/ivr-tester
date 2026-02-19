import { press, type Then } from "ivr-tester";
import Joi from "joi";

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
