import { or, type When } from "ivr-tester";
import Joi from "joi";
import type { JsonWhenPrompt } from "../jsonScenario";
import { jsonWhenPromptContains } from "./contains";
import { jsonWhenPromptContainsSimilarTo } from "./containsSimilarTo";
import { jsonWhenPromptIsAnything } from "./isAnything";
import { jsonWhenPromptSimilarTo } from "./similarTo";

const typeValue = "or" as const;

export interface JsonWhenPromptOr {
  type: typeof typeValue;
  value: JsonWhenPrompt[];
}

export const jsonWhenPromptOr = {
  typeValue,
  schema: Joi.object<JsonWhenPromptOr>({
    type: Joi.valid(typeValue).required(),
    value: Joi.array()
      .items(
        Joi.alternatives().try(
          jsonWhenPromptIsAnything.schema,
          jsonWhenPromptContains.schema,
          jsonWhenPromptContainsSimilarTo.schema,
          jsonWhenPromptSimilarTo.schema,
        ),
      )
      .required(),
  }),
  converter:
    (converter: (jsonWhen: JsonWhenPrompt) => When) =>
    (json: JsonWhenPromptOr): When => {
      const whenPrompts = json.value.map((w) => converter(w));
      return or(...whenPrompts);
    },
};
