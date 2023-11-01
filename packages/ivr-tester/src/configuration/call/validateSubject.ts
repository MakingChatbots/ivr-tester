import Joi, { ValidationError } from 'joi';
import { IvrNumber } from './IvrNumber';

const schema = Joi.object<IvrNumber>({
  from: Joi.string().required(),
  to: Joi.string().required(),
});

export type Subject = IvrNumber;

export const validateSubject = (subject: Subject): { error?: ValidationError } => {
  const { error } = schema.validate(subject, {
    presence: 'required',
  });

  return { error };
};
