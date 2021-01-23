import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { Call } from "../call/Call";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import { IvrTest } from "./test/IvrTest";
import { TestInstance, TestInstanceClass } from "./test/TestInstanceClass";

export interface TestExecutor {
  startTest(test: IvrTest, call: Call): TestInstance;
}

export class DefaultTestExecutor implements TestExecutor {
  constructor(
    private readonly transcriberFactory: TranscriberFactory,
    private readonly completeTranscriptionTimeoutInMs: number
  ) {}

  public startTest(test: IvrTest, call: Call): TestInstance {
    const callTranscriber = new CallTranscriber(
      call,
      this.transcriberFactory(),
      this.completeTranscriptionTimeoutInMs
    );

    return new TestInstanceClass(call, callTranscriber, test);
  }
}
