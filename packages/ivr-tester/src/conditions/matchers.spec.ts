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
    expect(similarTo(actual)(transcript)).toBe(expected)
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
    expect(contains(actual)(transcript)).toBe(expected)
  );

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

  test("part calls matcher with every part of a sentence", () => {
    const mockWhen: jest.Mocked<When> = jest.fn();

    part(mockWhen)("this is. a test");

    expect(mockWhen).toBeCalledWith("this");
    expect(mockWhen).toBeCalledWith("this is.");
    expect(mockWhen).toBeCalledWith("this is. a");
    expect(mockWhen).toBeCalledWith("this is. a test");
    expect(mockWhen).toBeCalledWith("is.");
    expect(mockWhen).toBeCalledWith("is. a");
    expect(mockWhen).toBeCalledWith("is. a test");
    expect(mockWhen).toBeCalledWith("a");
    expect(mockWhen).toBeCalledWith("a test");
    expect(mockWhen).toBeCalledWith("test");
    expect(mockWhen).toBeCalledTimes(10);
  });

  test("part returns when matcher has a match", () => {
    const mockWhen: When = (text: string) => text === "this is";

    expect(part(mockWhen)("this is a test")).toBe(true);
    expect(part(mockWhen)("hello world")).toBe(false);
  });
});
