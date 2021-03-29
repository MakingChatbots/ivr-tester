import { Scenario } from "../configuration/scenario/Scenario";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  scenario: Scenario;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

/**
 * The number of calls that are made reflect the amount of tests needed
 * to be run. As each call's stream connects this is used to determine
 * the test that should be run
 */
export interface TestAssigner {
  assign(): TestAssigned | NoneAssigned;
}

export class IteratingTestAssigner implements TestAssigner {
  private readonly testIterator: IterableIterator<[number, Scenario]>;

  constructor(readonly scenarios: Scenario[]) {
    this.testIterator = scenarios.entries();
  }

  public assign(): TestAssigned | NoneAssigned {
    const testEntry = this.testIterator.next();
    if (!testEntry.done) {
      const [, test]: [number, Scenario] = testEntry.value;
      return { isAssigned: true, scenario: test };
    }

    return { isAssigned: false, reason: "All tests already assigned" };
  }
}
