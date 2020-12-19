import { EventEmitter } from "events";
import { AssertThen } from "../testing/conditions/AssertThen";
import { TranscriptHandlerEvent } from "../call/transcription/TranscriptionHandler";
import { Call } from "../call/Call";

/** @internal */
export interface TestSubject {
  from: string;
  to: string;
}

/** @internal */
export interface TestResult {
  matchedCondition?: AssertThen;
  result: "continue" | "fail" | "pass";
}

// TODO Is there a better name?
export interface TestContainer {
  /**
   * Called each time with a transcript is received
   */
  test(transcript: string, call: Call): TestResult;
}

/** @internal */
export interface IvrTest {
  name: string; // TODO Enforce that test names are defined and unique
  test: TestContainer;
}

/** @internal */
export interface TestFailed {
  test: IvrTest;
  transcription: string;
}

/** @internal */
export interface TestPassed {
  test: IvrTest;
}

/** @internal */
export interface TestConditionMet {
  test: IvrTest;
  transcription: string;
  condition: AssertThen;
}

/**
 * Conditions have to have been met in sequence
 * @internal
 */
export class TestHandler extends EventEmitter {
  private static readonly TRANSCRIPTION_EVENT = "transcription";

  private static readonly TEST_FAILED_EVENT = "TestFailed";
  private static readonly TEST_PASSED_EVENT = "TestPassed";
  private static readonly TEST_CONDITION_MET_EVENT = "ConditionMet";

  constructor(
    private readonly call: Call,
    private readonly transcriptionHandler: EventEmitter,
    private readonly ivrTest: IvrTest
  ) {
    super();
    transcriptionHandler.on(
      TestHandler.TRANSCRIPTION_EVENT,
      this.processTranscript.bind(this)
    );
  }

  private processTranscript({ transcription }: TranscriptHandlerEvent): void {
    const testOutcome = this.ivrTest.test.test(transcription, this.call);
    switch (testOutcome.result) {
      case "continue":
        if (testOutcome.matchedCondition) {
          this.notifyOfConditionBeingMet(
            transcription,
            testOutcome.matchedCondition
          );
        }
        return;
      case "pass":
        if (testOutcome.matchedCondition) {
          this.notifyOfConditionBeingMet(
            transcription,
            testOutcome.matchedCondition
          );
        }
        this.notifyOfPassedTest();
        return;
      case "fail":
        this.notifyOfFailedTest(transcription);
        return;
      default:
        return;
    }
  }

  private notifyOfFailedTest(transcription: string): void {
    const event: TestFailed = { transcription, test: this.ivrTest };
    this.emit(TestHandler.TEST_FAILED_EVENT, event);
  }

  private notifyOfPassedTest(): void {
    const event: TestPassed = {
      test: this.ivrTest,
    };
    this.emit(TestHandler.TEST_PASSED_EVENT, event);
  }

  private notifyOfConditionBeingMet(
    transcription: string,
    condition: AssertThen
  ): void {
    const event: TestConditionMet = {
      test: this.ivrTest,
      transcription,
      condition,
    };
    this.emit(TestHandler.TEST_CONDITION_MET_EVENT, event);
  }
}
