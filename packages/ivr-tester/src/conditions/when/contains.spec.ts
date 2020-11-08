import { contains } from "./contains";

test.each([
  [
    "thank you let's submit a metre reading press one for guests or two for electricity",
    "let's submit a metre reading",
    true,
  ],
  [
    "you entered one two three please press one if this is correct or press to try again",
    "please press one if this is correct",
    true,
  ],
  ["press to try again", "press two to try again", false],
  ["Press To Try Again", "press to try again", true],
])("contains ('%s')", (transcript, actual, expected) =>
  expect(contains(actual)(transcript)).toBe(expected)
);
