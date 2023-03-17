import { containsSimilarTo } from "./containsSimilarTo";

test("contains similar to", () => {
  expect(containsSimilarTo("world")("hello world")).toBe(true);
  expect(containsSimilarTo("hello world")("hello world")).toBe(true);

  expect(containsSimilarTo("change")("hello world")).toBe(false);
});
