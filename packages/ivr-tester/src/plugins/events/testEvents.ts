import { IvrTest } from "../../handlers/TestHandler";
import { TranscriptCondition } from "../../conditions/TranscriptCondition";

export interface CallAssignedTestEvent {
  index: number;
  test: IvrTest;
}

export interface IvrTestConditionMetEvent {
  test: IvrTest;
  transcription: string;
  condition: TranscriptCondition;
}

export interface IvrTestSuccessEvent {
  test: IvrTest;
}

export interface IvrTestFailed {
  transcription: string;
  test: IvrTest;
}

/**
 * Lifecycle events for performing the tests
 */
export type TestEvents = {
  callConnected: undefined;
  callAssignedTest: CallAssignedTestEvent;
  ivrTestConditionMet: IvrTestConditionMetEvent;
  ivrTestPassed: IvrTestSuccessEvent;
  ivrTestFailed: IvrTestFailed;
};
