import { similarTo } from "./similarTo";

test.each([
  [
    "thank you let's submit a metre reading press one for guests or two for electricity",
    "Thank you. Let's submit a meter reading. Press one for gas or two for electricity",
    true,
  ],
  [
    "you entered one two three please press one if this is correct or press to try again",
    "You entered one two three. Please press one if this is correct, or press two to try again",
    true,
  ],
  [
    "you entered one two three please press one if this is correct or press to try again",
    "You entered five six seven. Please press one if this is correct, or press two to try again",
    false,
  ],
])("similarTo ('%s')", (transcript, actual, expected) =>
  expect(similarTo(actual)(transcript)).toBe(expected)
);
