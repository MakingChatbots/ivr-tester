import { sanitise } from "./dateAndPhoneNumberFilename";

test.each([
  ["example! - 123 ????.hello-test", "example---123-hello-test"],
])("'%s' sanitised is '%s'", (unsanitised, sanitised) =>
  expect(sanitise(unsanitised)).toBe(sanitised)
);
