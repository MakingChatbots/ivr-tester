import { contains, isAnything, Scenario, Step, Then, When } from "ivr-tester";
import { validateScenario } from "./validateJsonScenario";
import {
  JsonScenario,
  JsonStep,
  JsonThen,
  JsonWhenPrompt,
} from "./jsonScenario";
import { jsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import { jsonWhenPromptContains } from "./whenPrompt/contains";
import { jsonThenDoNothing } from "./then/doNothing";
import { jsonThenPress } from "./then/press";

// {
//   whenPrompt: isAnything(),
//       then: press("1"),
//     silenceAfterPrompt: 2000,
//     timeout: 4000,
// },
// {
//   whenPrompt: contains("please enter a number"),
//       then: press("0123456789"),
//     silenceAfterPrompt: 3000,
//     timeout: 4000,
// },
// {
//   whenPrompt: contains("you entered the values 0123456789"),
//       then: doNothing(),
//     silenceAfterPrompt: 3000,
//     timeout: 4000,
// },

function convertWhen(jsonWhen: JsonWhenPrompt): When {
  switch (jsonWhen.type) {
    case "isAnything":
      return jsonWhenPromptIsAnything.converter(jsonWhen);
    case "contains":
      return jsonWhenPromptContains.converter(jsonWhen);
    default:
      throw new Error(
        `Factory for whenPrompt '${JSON.stringify(jsonWhen)}' does not exist`
      );
  }
}

function convertThen(jsonThen: JsonThen): Then {
  switch (jsonThen.type) {
    case "doNothing":
      return jsonThenDoNothing.converter(jsonThen);
    case "press":
      return jsonThenPress.converter(jsonThen);
    default:
      throw new Error(
        `Factory for then '${JSON.stringify(jsonThen)}' does not exist`
      );
  }
}

export function convertStep(jsonStep: JsonStep): Step {
  return {
    whenPrompt: convertWhen(jsonStep.whenPrompt),
    then: convertThen(jsonStep.then),
    silenceAfterPrompt: jsonStep.silenceAfterPrompt,
    timeout: jsonStep.timeout,
  };
}

function convert(jsonScenario: JsonScenario): Scenario {
  return {
    name: "Keys pressed are read back",
    steps: jsonScenario.steps.map(convertStep),
  };
}

export function scenarioConverter(scenario: unknown): Scenario {
  const validationResult = validateScenario(scenario);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  return convert(validationResult.scenario);
}
