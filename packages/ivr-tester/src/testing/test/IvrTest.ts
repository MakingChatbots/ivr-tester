import { Call } from "../../call/Call";
import { TestResult } from "./TestInstanceClass";

// TODO Is there a better name?
export interface TestContainer {
  /**
   * Called each time with a transcript is received
   */
  test(transcript: string, call: Call): Promise<TestResult>;
}

export interface IvrTest {
  name: string; // TODO Enforce that test names are defined and unique
  test: TestContainer;
}
