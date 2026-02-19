import type { JsonThenDoNothing } from "./then/doNothing";
import type { JsonThenHangUp } from "./then/hangUp";
import type { JsonThenPress } from "./then/press";
import type { JsonWhenPromptAnd } from "./whenPrompt/and";
import type { JsonWhenPromptContains } from "./whenPrompt/contains";
import type { JsonWhenPromptContainsSimilarTo } from "./whenPrompt/containsSimilarTo";
import type { JsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import type { JsonWhenPromptOr } from "./whenPrompt/or";
import type { JsonWhenPromptSimilarTo } from "./whenPrompt/similarTo";

export type JsonWhenPrompt =
  | JsonWhenPromptIsAnything
  | JsonWhenPromptContains
  | JsonWhenPromptContainsSimilarTo
  | JsonWhenPromptSimilarTo
  | JsonWhenPromptOr
  | JsonWhenPromptAnd;

export type JsonThen = JsonThenDoNothing | JsonThenPress | JsonThenHangUp;

export interface JsonStep {
  whenPrompt: JsonWhenPrompt;
  then: JsonThen;
  silenceAfterPrompt: number;
  timeout: number;
}

export interface JsonScenario {
  name: string;
  steps: JsonStep[];
}
