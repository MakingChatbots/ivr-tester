import { IvrTest } from "./test/IvrTest";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  test: IvrTest;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

export interface TestAssigner {
  assign(): TestAssigned | NoneAssigned;
}

export class IteratingTestAssigner implements TestAssigner {
  private readonly testIterator: IterableIterator<[number, IvrTest]>;

  constructor(readonly tests: IvrTest[]) {
    this.testIterator = tests.entries();
  }

  public assign(): TestAssigned | NoneAssigned {
    const testEntry = this.testIterator.next();
    if (!testEntry.done) {
      const [, test]: [number, IvrTest] = testEntry.value;
      return { isAssigned: true, test };
    }

    return { isAssigned: false, reason: "All tests already assigned" };
  }
}
