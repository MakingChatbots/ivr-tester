import { IvrTest } from "../../handlers/TestHandler";
import { AssertThen } from "../../testing/conditions/AssertThen";

export interface CallAssignedTestEvent {
  index: number;
  test: IvrTest;
}

export interface IvrTestConditionMetEvent {
  test: IvrTest;
  transcription: string;
  condition: AssertThen;
}

export interface IvrTestSuccessEvent {
  test: IvrTest;
}

export interface IvrTestFailed {
  transcription: string;
  test: IvrTest;
}

/**
 * Lifecycle events during testing
 */
export type TestEvents = {
  callConnected: undefined;
  callAssignedTest: CallAssignedTestEvent;
  ivrTestConditionMet: IvrTestConditionMetEvent;
  ivrTestPassed: IvrTestSuccessEvent;
  ivrTestFailed: IvrTestFailed;
};
