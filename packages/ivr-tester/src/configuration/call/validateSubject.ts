import { type ZodError, z } from 'zod';
import type { IvrNumber } from './IvrNumber.js';

const schema = z.object({
  from: z.string(),
  to: z.string(),
});

export type Subject = IvrNumber;

export const validateSubject = (subject: Subject): { error?: ZodError } => {
  const result = schema.safeParse(subject);

  if (!result.success) {
    return { error: result.error };
  }

  return {};
};