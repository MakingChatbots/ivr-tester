import { IvrTest } from "../handlers/TestHandler";
import { NoneAssigned, TestAssigned, TestAssigner } from "./CallServer";

export interface TestAssignerEventProbe {
  callAssignedTest: (event: { index: number; test: IvrTest }) => void;
}

/** @internal */
export class IteratingTestAssigner implements TestAssigner {
  private readonly testIterator: IterableIterator<[number, IvrTest]>;

  constructor(
    readonly tests: IvrTest[],
    private readonly probe: TestAssignerEventProbe = {
      callAssignedTest: () => undefined,
    }
  ) {
    this.testIterator = tests.entries();
  }

  public assign(): TestAssigned | NoneAssigned {
    const testEntry = this.testIterator.next();
    if (!testEntry.done) {
      const [index, test]: [number, IvrTest] = testEntry.value;
      this.probe.callAssignedTest({ test, index });

      return { isAssigned: true, test };
    }

    return { isAssigned: false, reason: "All tests already assigned" };
  }
}
