import { jsonWhenPromptAnd } from "./and";

test("valid schema", () => {
  const result = jsonWhenPromptAnd.schema.validate({
    type: "and",
    value: [
      { type: "contains", value: "1" },
      { type: "contains", value: "2" },
    ],
  });

  expect(result.error).not.toBeDefined();
});

test("type must be 'and'", () => {
  const result = jsonWhenPromptAnd.schema.validate({
    type: "",
    value: [
      { type: "contains", value: "1" },
      { type: "contains", value: "2" },
    ],
  });

  expect(result.error.message).toStrictEqual('"type" must be [and]');
});

test("value can be empty array", () => {
  const result = jsonWhenPromptAnd.schema.validate({
    type: "",
    value: [],
  });

  expect(result.error.message).toStrictEqual('"type" must be [and]');
});
