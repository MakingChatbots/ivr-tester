import { convertStep, scenarioConverter } from "./scenarioConverter";
import { JsonScenario } from "./jsonScenario";

test("JSON scenario converted to Scenario", () => {
  const jsonScenario: JsonScenario = {
    name: "Keys pressed are read back",
    steps: [
      {
        whenPrompt: {
          type: "isAnything",
        },
        then: { type: "press", value: "1" },
        silenceAfterPrompt: 2000,
        timeout: 4000,
      },
      {
        whenPrompt: { type: "contains", value: "please enter a number" },
        then: { type: "press", value: "0123456789" },
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
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

  expect(scenarioConverter(jsonScenario)).toStrictEqual({
    name: "Keys pressed are read back",
    steps: [
      {
        whenPrompt: expect.any(Function),
        then: {
          do: expect.any(Function),
          describe: expect.any(Function),
        },
        silenceAfterPrompt: 2000,
        timeout: 4000,
      },
      {
        whenPrompt: expect.any(Function),
        then: {
          do: expect.any(Function),
          describe: expect.any(Function),
        },
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
      {
        whenPrompt: expect.any(Function),
        then: {
          do: expect.any(Function),
          describe: expect.any(Function),
        },
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
    ],
  });
});

test("converts step timings", () => {
  const step = convertStep({
    whenPrompt: { type: "isAnything" },
    then: { type: "press", value: "1" },
    silenceAfterPrompt: 2000,
    timeout: 4000,
  });

  expect(step).toMatchObject({
    whenPrompt: expect.any(Function),
    then: expect.any(Object),
    silenceAfterPrompt: 2000,
    timeout: 4000,
  });
});

describe("whenPrompt", () => {
  test("isAnything", () => {
    const step = convertStep({
      whenPrompt: {
        type: "isAnything",
      },
      then: { type: "doNothing" },
      silenceAfterPrompt: 0,
      timeout: 0,
    });

    expect(step.whenPrompt("anything")).toEqual(true);
  });

  test("contains with single value", () => {
    const step = convertStep({
      whenPrompt: { type: "contains", value: "enter a number" },
      then: { type: "doNothing" },
      silenceAfterPrompt: 0,
      timeout: 0,
    });

    expect(step.whenPrompt("please enter a number")).toEqual(true);
    expect(step.whenPrompt("will not match")).toEqual(false);
  });

  test("contains with multiple values", () => {
    const step = convertStep({
      whenPrompt: { type: "contains", value: ["enter 1", "2"] },
      then: { type: "doNothing" },
      silenceAfterPrompt: 0,
      timeout: 0,
    });

    expect(step.whenPrompt("please enter 1 or 2")).toEqual(true);
    expect(step.whenPrompt("will not match")).toEqual(false);
  });
});

describe("then", () => {
  test("doNothing", () => {
    const step = convertStep({
      whenPrompt: {
        type: "isAnything",
      },
      then: { type: "doNothing" },
      silenceAfterPrompt: 0,
      timeout: 0,
    });

    expect(step.then.describe()).toEqual("do nothing");
  });

  test("press", () => {
    const step = convertStep({
      whenPrompt: {
        type: "isAnything",
      },
      then: { type: "press", value: "123" },
      silenceAfterPrompt: 0,
      timeout: 0,
    });

    expect(step.then.describe()).toEqual("press keys 123");
  });
});
