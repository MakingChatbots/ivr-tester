import { Step } from "./Step";

export interface Scenario {
  // TODO Enforce that test names are defined and unique
  name: string;
  steps: Step[];
}
