import { dtmfSequenceValidator } from './dtmfSequenceUtils';

test.each([
  ['123', { valid: false, reason: "DTMF sequence '123' must be an array of strings" }],
  [['W'], { valid: true }],
  [
    ['abc'],
    {
      valid: false,
      reason:
        "DTMF sequence 'abc' contains invalid digit(s) 'abc'. The valid digits are '0,1,2,3,4,5,6,7,8,9,*,#,w'",
    },
  ],
  [
    [],
    {
      valid: false,
      reason: 'At least one digit must be provided',
    },
  ],
  [
    undefined,
    {
      valid: false,
      reason: "DTMF sequence 'undefined' must be an array of strings",
    },
  ],
  [
    ['1', 0, '2'],
    {
      valid: false,
      reason: "DTMF sequence '1,0,2' must be an array of strings",
    },
  ],
])("dtmfSequenceValidator ('%s') = '%s'", (dtmfSequence, expected) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(dtmfSequenceValidator(dtmfSequence)).toStrictEqual(expected),
);
