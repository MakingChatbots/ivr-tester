import { PromptDefinition } from "./PromptDefinition";

export interface TestScenario {
  // TODO Enforce that test names are defined and unique
  name: string;
  instructions: PromptDefinition[];
}
