import { matches } from "./matches";

test.each([
  [
    "thank you let's submit a metre reading press one for guests or two for electricity",
    /1|one/,
    true,
  ],
  ["press to try again", /test/, false],
])("matches ('%s')", (transcript, actual, expected) =>
  expect(matches(actual)(transcript)).toBe(expected)
);
