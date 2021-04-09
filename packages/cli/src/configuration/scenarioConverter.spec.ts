import { contains, doNothing, isAnything, press, Scenario } from "ivr-tester";
import { JsonScenario, scenarioConverter } from "./scenarioConverter";

const scenarioBefore: JsonScenario = {
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

const scenarioAfter: Scenario = {
  name: "Keys pressed are read back",
  steps: [
    {
      whenPrompt: isAnything(),
      then: press("1"),
      silenceAfterPrompt: 2000,
      timeout: 4000,
    },
    {
      whenPrompt: contains("please enter a number"),
      then: press("0123456789"),
      silenceAfterPrompt: 3000,
      timeout: 4000,
    },
    {
      whenPrompt: contains("you entered the values 0123456789"),
      then: doNothing(),
      silenceAfterPrompt: 3000,
      timeout: 4000,
    },
  ],
};

test("example", () => {
  expect(scenarioConverter(scenarioBefore)).toStrictEqual(scenarioAfter);
});
