import { IvrTest } from "../handlers/TestInstanceClass";
import { NoneAssigned, TestAssigned, TestAssigner } from "./TestAssigner";

// export interface TestAssignerEventProbe {
//   callAssignedTest: (event: { index: number; test: IvrTest }) => void;
// }

/** @internal */
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
