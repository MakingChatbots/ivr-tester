import { jsonWhenPromptOr } from "./or";

test("valid schema", () => {
  const result = jsonWhenPromptOr.schema.validate({
    type: "or",
    value: [
      { type: "contains", value: "1" },
      { type: "contains", value: "2" },
    ],
  });

  expect(result.error).not.toBeDefined();
});

test("type must be 'or'", () => {
  const result = jsonWhenPromptOr.schema.validate({
    type: "",
    value: [
      { type: "contains", value: "1" },
      { type: "contains", value: "2" },
    ],
  });

  expect(result.error.message).toStrictEqual('"type" must be [or]');
});

test("value can be empty array", () => {
  const result = jsonWhenPromptOr.schema.validate({
    type: "",
    value: [],
  });

  expect(result.error.message).toStrictEqual('"type" must be [or]');
});
