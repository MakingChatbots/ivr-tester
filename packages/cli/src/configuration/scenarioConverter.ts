import { contains, doNothing, isAnything, press, Scenario } from "ivr-tester";
import { validateScenario } from "./validateJsonScenario";
import { JsonScenario } from "./jsonScenario";

function convert(jsonScenario: JsonScenario): Scenario {
  return {
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
}

export function scenarioConverter(scenario: unknown): Scenario {
  const validationResult = validateScenario(scenario);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  return convert(validationResult.scenario);
}
