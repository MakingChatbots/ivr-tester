import { Scenario, Step, Then, When } from "ivr-tester";
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
import { jsonThenHangUp } from "./then/hangUp";
import { jsonWhenPromptContainsSimilarTo } from "./whenPrompt/containsSimilarTo";
import { jsonWhenPromptSimilarTo } from "./whenPrompt/similarTo";
import { jsonWhenPromptOr } from "./whenPrompt/or";
import { jsonWhenPromptAnd } from "./whenPrompt/and";

export function convertWhen(jsonWhen: JsonWhenPrompt): When {
  switch (jsonWhen.type) {
    case jsonWhenPromptIsAnything.typeValue:
      return jsonWhenPromptIsAnything.converter(jsonWhen);
    case jsonWhenPromptContains.typeValue:
      return jsonWhenPromptContains.converter(jsonWhen);
    case jsonWhenPromptContainsSimilarTo.typeValue:
      return jsonWhenPromptContainsSimilarTo.converter(jsonWhen);
    case jsonWhenPromptSimilarTo.typeValue:
      return jsonWhenPromptSimilarTo.converter(jsonWhen);
    case jsonWhenPromptOr.typeValue:
      return jsonWhenPromptOr.converter(convertWhen)(jsonWhen);
    case jsonWhenPromptAnd.typeValue:
      return jsonWhenPromptAnd.converter(convertWhen)(jsonWhen);
    default:
      throw new Error(
        `Factory for whenPrompt '${JSON.stringify(jsonWhen)}' does not exist`
      );
  }
}

function convertThen(jsonThen: JsonThen): Then {
  switch (jsonThen.type) {
    case jsonThenDoNothing.typeValue:
      return jsonThenDoNothing.converter(jsonThen);
    case jsonThenPress.typeValue:
      return jsonThenPress.converter(jsonThen);
    case jsonThenHangUp.typeValue:
      return jsonThenHangUp.converter(jsonThen);
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
    name: jsonScenario.name,
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
