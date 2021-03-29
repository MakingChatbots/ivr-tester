import Joi, { ValidationError } from "joi";
import { IvrNumber } from "./IvrNumber";

const schema = Joi.object<IvrNumber>({
  from: Joi.string().required(),
  to: Joi.string().required(),
});

export type TestSubject = IvrNumber | Buffer;

export const validateTestSubject = (
  testSubject: TestSubject
): { error?: ValidationError } => {
  if (Buffer.isBuffer(testSubject)) {
    return {};
  }

  const { error } = schema.validate(testSubject, {
    presence: "required",
  });

  return { error };
};
