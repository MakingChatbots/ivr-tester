import Joi, { ValidationError } from "joi";
import { IvrNumber } from "./IvrNumber";

const schema = Joi.object<IvrNumber>({
  from: Joi.string().required(),
  to: Joi.string().required(),
});

export type Subject = IvrNumber | Buffer;

export const validateSubject = (
  subject: Subject
): { error?: ValidationError } => {
  if (Buffer.isBuffer(subject)) {
    return {};
  }

  const { error } = schema.validate(subject, {
    presence: "required",
  });

  return { error };
};
