import { contains } from "./contains";
import { When } from "./When";

test("can be configured to be case sensitive", () => {
  const transcript = "Hello World";

  expect(contains("hello", { ignoreCasing: false })(transcript)).toBe(false);
  expect(contains("Hello", { ignoreCasing: false })(transcript)).toBe(true);
});

test("when passed another when condition then each part of the transcript passed to it", () => {
  const mockWhen: jest.Mocked<When> = jest.fn();

  contains(mockWhen)("this is. a test");

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

test("passes if the when argument returns true", () => {
  const mockWhen: jest.Mocked<When> = jest.fn().mockReturnValue(true);
  expect(contains(mockWhen)("this is a test")).toBe(true);
});

test("fails if the when argument returns false", () => {
  const mockWhen: jest.Mocked<When> = jest.fn().mockReturnValue(false);
  expect(contains(mockWhen)("this is a test")).toBe(false);
});
