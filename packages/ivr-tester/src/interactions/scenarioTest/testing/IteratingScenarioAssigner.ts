import { Scenario } from "../../../configuration/scenario/Scenario";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface ScenarioAssigned extends AssignedResult {
  isAssigned: true;
  scenario: Scenario;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

/**
 * The number of calls that are made reflect the amount of scenarios needed
 * to be run. As each call's stream connects this is used to determine
 * the scenario that should be run
 */
export interface ScenarioAssigner {
  assign(): ScenarioAssigned | NoneAssigned;
}

export class IteratingScenarioAssigner implements ScenarioAssigner {
  private readonly scenarioIterator: IterableIterator<[number, Scenario]>;

  constructor(readonly scenarios: Scenario[]) {
    this.scenarioIterator = scenarios.entries();
  }

  public assign(): ScenarioAssigned | NoneAssigned {
    const scenarioEntry = this.scenarioIterator.next();
    if (!scenarioEntry.done) {
      const [, test]: [number, Scenario] = scenarioEntry.value;
      return { isAssigned: true, scenario: test };
    }

    return { isAssigned: false, reason: "All scenarios already assigned" };
  }
}
