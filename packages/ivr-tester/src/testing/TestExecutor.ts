import { IvrTest, TestInstance } from "../handlers/TestInstanceClass";
import { Call } from "../call/Call";

export interface TestExecutor {
  startTest(test: IvrTest, call: Call): TestInstance;
}
