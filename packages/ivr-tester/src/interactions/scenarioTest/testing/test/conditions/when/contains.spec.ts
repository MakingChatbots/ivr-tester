import { contains } from "./contains";

test("can be configured to be case sensitive", () => {
  const transcript = "Hello World";

  expect(contains("hello", { ignoreCasing: false })(transcript)).toBe(false);
  expect(contains("Hello", { ignoreCasing: false })(transcript)).toBe(true);
});
