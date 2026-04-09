import type { Step } from './Step.js';

export interface Scenario {
  name: string;
  steps: Step[];
}
