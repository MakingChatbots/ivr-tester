import { JsonWhenPromptIsAnything } from "./whenPrompt/isAnything";
import { JsonWhenPromptContains } from "./whenPrompt/contains";
import { JsonThenDoNothing } from "./then/doNothing";
import { JsonThenPress } from "./then/press";

export type JsonWhenPrompt = JsonWhenPromptIsAnything | JsonWhenPromptContains;
export type JsonThen = JsonThenDoNothing | JsonThenPress;

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
