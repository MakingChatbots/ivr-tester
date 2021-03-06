import { CallFlowTest } from "./test/CallFlowTest";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  test: CallFlowTest;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

export interface TestAssigner {
  assign(): TestAssigned | NoneAssigned;
}

export class IteratingTestAssigner implements TestAssigner {
  private readonly testIterator: IterableIterator<[number, CallFlowTest]>;

  constructor(readonly tests: CallFlowTest[]) {
    this.testIterator = tests.entries();
  }

  public assign(): TestAssigned | NoneAssigned {
    const testEntry = this.testIterator.next();
    if (!testEntry.done) {
      const [, test]: [number, CallFlowTest] = testEntry.value;
      return { isAssigned: true, test };
    }

    return { isAssigned: false, reason: "All tests already assigned" };
  }
}
