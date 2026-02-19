import { and, type When } from "ivr-tester";
import Joi from "joi";
import type { JsonWhenPrompt } from "../jsonScenario";
import { jsonWhenPromptContains } from "./contains";
import { jsonWhenPromptContainsSimilarTo } from "./containsSimilarTo";
import { jsonWhenPromptIsAnything } from "./isAnything";
import { jsonWhenPromptSimilarTo } from "./similarTo";

const typeValue = "and" as const;

export interface JsonWhenPromptAnd {
  type: typeof typeValue;
  value: JsonWhenPrompt[];
}

export const jsonWhenPromptAnd = {
  typeValue,
  schema: Joi.object<JsonWhenPromptAnd>({
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
    (json: JsonWhenPromptAnd): When => {
      const whenPrompts = json.value.map((w) => converter(w));
      return and(...whenPrompts);
    },
};
