import { SupportedTone } from './DtmfBufferGenerator';

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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      reason: `DTMF sequence '${possibleDtmfSequence}' must be an array of strings`,
    };
  }

  if (possibleDtmfSequence.length === 0) {
    return { valid: false, reason: 'At least one digit must be provided' };
  }

  const invalidDigits = possibleDtmfSequence.filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (c) => !validDtmfDigits.includes(c.toLocaleLowerCase()),
  );
  if (invalidDigits.length > 0) {
    return {
      valid: false,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      reason: `DTMF sequence '${possibleDtmfSequence}' contains invalid digit(s) '${invalidDigits}'. The valid digits are '${validDtmfDigits}'`,
    };
  }

  return { valid: true };
}
