import { JsonScenario } from "./jsonScenario";
import { validateScenario } from "./validateJsonScenario";

test("Return JSON scenario if no errors", () => {
  const validScenario: JsonScenario = {
    name: "Valid JSON schema",
    steps: [
      {
        whenPrompt: {
          type: "contains",
          value: "you entered the values 0123456789",
        },
        then: { type: "doNothing" },
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
    ],
  };

  const validationResult = validateScenario(validScenario);

  expect(validationResult.error).not.toBeDefined();
  expect(validationResult.scenario).toMatchObject(validScenario);
});

test("Return errors if invalid", () => {
  const invalidScenario: JsonScenario = {
    name: "Invalid JSON schema",
    steps: [
      {
        whenPrompt: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          type: "ns",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: "",
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        then: { type: "do" },
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
    ],
  };

  const validationResult = validateScenario(invalidScenario);

  expect(validationResult.error).toBeDefined();
  expect(validationResult.scenario).not.toBeDefined();
});
