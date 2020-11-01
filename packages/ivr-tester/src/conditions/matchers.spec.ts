import { contains, matches, part, similarTo, When } from "./matchers";

describe("Matchers", () => {
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
    expect(similarTo(actual).check(transcript)).toBe(expected)
  );

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
    ["Press To Try Again", "press to try again", false],
  ])("contains ('%s')", (transcript, actual, expected) =>
    expect(contains(actual).check(transcript)).toBe(expected)
  );

  test.each([
    [
      "thank you let's submit a metre reading press one for guests or two for electricity",
      /1|one/,
      true,
    ],
    ["press to try again", /test/, false],
  ])("matches ('%s')", (transcript, actual, expected) =>
    expect(matches(actual).check(transcript)).toBe(expected)
  );

  test("part calls matcher with every part of a sentence", () => {
    const mockWhen: jest.Mocked<When> = {
      check: jest.fn(),
      describe: jest.fn(),
    };

    part(mockWhen).check("this is. a test");

    expect(mockWhen.check).toBeCalledWith("this");
    expect(mockWhen.check).toBeCalledWith("this is.");
    expect(mockWhen.check).toBeCalledWith("this is. a");
    expect(mockWhen.check).toBeCalledWith("this is. a test");
    expect(mockWhen.check).toBeCalledWith("is.");
    expect(mockWhen.check).toBeCalledWith("is. a");
    expect(mockWhen.check).toBeCalledWith("is. a test");
    expect(mockWhen.check).toBeCalledWith("a");
    expect(mockWhen.check).toBeCalledWith("a test");
    expect(mockWhen.check).toBeCalledWith("test");
    expect(mockWhen.check).toBeCalledTimes(10);
  });

  test("part returns when matcher has a match", () => {
    const mockWhen: When = {
      check: (text: string) => text === "this is",
      describe: () => "",
    };

    expect(part(mockWhen).check("this is a test")).toBe(true);
    expect(part(mockWhen).check("hello world")).toBe(false);
  });
});
