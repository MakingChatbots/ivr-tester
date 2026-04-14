import type { SupportedTone } from './DtmfBufferGenerator.js';

const validDtmfDigits: ReadonlyArray<SupportedTone> = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '*',
  '#',
  'w',
];

const isArrayOfString = (x: unknown[]): x is string[] =>
  Array.isArray(x) && x.every((e) => typeof e === 'string');

export function dtmfSequenceValidator(
  possibleDtmfSequence: string[],
): { valid: true } | { valid: false; reason: string } {
  if (!isArrayOfString(possibleDtmfSequence)) {
    return {
      valid: false,
      reason: `DTMF sequence '${possibleDtmfSequence}' must be an array of strings`,
    };
  }

  if (possibleDtmfSequence.length === 0) {
    return { valid: false, reason: 'At least one digit must be provided' };
  }

  const invalidDigits = possibleDtmfSequence.filter(
    (c) => !validDtmfDigits.includes(c.toLocaleLowerCase() as SupportedTone),
  );
  if (invalidDigits.length > 0) {
    return {
      valid: false,
      reason: `DTMF sequence '${possibleDtmfSequence}' contains invalid digit(s) '${invalidDigits}'. The valid digits are '${validDtmfDigits}'`,
    };
  }

  return { valid: true };
}
