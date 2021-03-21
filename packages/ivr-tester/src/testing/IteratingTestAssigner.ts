import { TestScenario } from "./scenario/TestScenario";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  test: TestScenario;
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
  private readonly testIterator: IterableIterator<[number, TestScenario]>;

  constructor(readonly tests: TestScenario[]) {
    this.testIterator = tests.entries();
  }

  public assign(): TestAssigned | NoneAssigned {
    const testEntry = this.testIterator.next();
    if (!testEntry.done) {
      const [, test]: [number, TestScenario] = testEntry.value;
      return { isAssigned: true, test };
    }

    return { isAssigned: false, reason: "All tests already assigned" };
  }
}
