import { JsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import { JsonWhenPromptContains } from "./whenPrompt/contains";
import { JsonThenDoNothing } from "./then/doNothing";
import { JsonThenPress } from "./then/press";
import { JsonThenHangUp } from "./then/hangUp";
import { JsonWhenPromptContainsSimilarTo } from "./whenPrompt/containsSimilarTo";
import { JsonWhenPromptSimilarTo } from "./whenPrompt/similarTo";
import { JsonWhenPromptOr } from "./whenPrompt/or";
import { JsonWhenPromptAnd } from "./whenPrompt/and";

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
