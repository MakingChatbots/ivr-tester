import { convertToDtmfArray, dtmfSequenceValidator } from "./dtmfSequenceUtils";

test.each([
  ["123", ["1", "2", "3"]],
  [
    ["1", "2", "3"],
    ["1", "2", "3"],
  ],
  [[], []],
  [undefined, []],
  [1, []],
  ["", []],
])("convertToDtmfArray ('%s') = '%s'", (dtmfSequence: any, expected) =>
  expect(convertToDtmfArray(dtmfSequence)).toStrictEqual(expected)
);

test.each([
  ["123", { valid: true }],
  [
    "abc",
    {
      valid: false,
      reason:
        "DTMF sequence 'abc' contains invalid digits 'a,b,c'. The valid digits are '0,1,2,3,4,5,6,7,8,9,*,#,w'",
    },
  ],
  [
    "",
    {
      valid: true,
    },
  ],
  [
    undefined,
    {
      valid: false,
      reason: "DTMF sequence 'undefined' must be a string or array of strings",
    },
  ],
  [
    ["1", 0, "2"],
    {
      valid: false,
      reason: "DTMF sequence '1,0,2' must be a string or array of strings",
    },
  ],
])("dtmfSequenceValidator ('%s') = '%s'", (dtmfSequence: any, expected) =>
  expect(dtmfSequenceValidator(dtmfSequence)).toStrictEqual(expected)
);
