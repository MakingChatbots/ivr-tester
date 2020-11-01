import { When } from "./When";
import { part } from "./part";

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
