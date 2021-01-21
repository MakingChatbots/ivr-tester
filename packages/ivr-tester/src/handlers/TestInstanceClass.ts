import { AssertThen } from "../testing/conditions/AssertThen";
import {
  CallTranscriptionEvent,
  CallTranscriptionEvents,
} from "../call/transcription/CallTranscriber";
import { Call } from "../call/Call";
import { Emitter, TypedEmitter } from "../Emitter";

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

export interface TestProgressEvent {
  test: IvrTest;
  transcription: {
    isFinal: boolean;
    transcription: string;
  };
}

export type TestInstanceEvents = {
  testFailed: TestFailed;
  testPassed: TestPassed;
  conditionMet: TestConditionMet;
  progress: TestProgressEvent;
};

export interface TestInstance extends Emitter<TestInstanceEvents> {
  getTest(): IvrTest;
  getCall(): Call;
}

/**
 * Conditions have to have been met in sequence
 * @internal
 */
// TODO Rename
export class TestInstanceClass
  extends TypedEmitter<TestInstanceEvents>
  implements TestInstance {
  constructor(
    private readonly call: Call,
    private readonly callTranscriber: Emitter<CallTranscriptionEvents>,
    private readonly ivrTest: IvrTest
  ) {
    super();
    callTranscriber.on("transcription", this.processTranscript.bind(this));
  }

  getCall(): Call {
    return this.call;
  }

  private processTranscript(event: CallTranscriptionEvent): void {
    const { transcription } = event;

    this.emit("progress", {
      test: this.ivrTest,
      transcription: {
        isFinal: event.isFinal,
        transcription,
      },
    });

    if (!event.isFinal) {
      return;
    }

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

  private notifyOfPassedTest(): void {
    const event: TestPassed = {
      test: this.ivrTest,
    };
    this.emit("testPassed", event);
  }

  private notifyOfFailedTest(transcription: string): void {
    const event: TestFailed = { transcription, test: this.ivrTest };
    this.emit("testFailed", event);
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
    this.emit("conditionMet", event);
  }

  getTest(): IvrTest {
    return this.ivrTest;
  }
}
