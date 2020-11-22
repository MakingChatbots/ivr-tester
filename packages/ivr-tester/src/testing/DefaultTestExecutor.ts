import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { Call } from "../call/Call";
import {
  IvrTest,
  TestConditionMet,
  TestFailed,
  TestHandler,
  TestPassed,
} from "../handlers/TestHandler";
import { TranscriptionHandler } from "../call/transcription/TranscriptionHandler";
import { TestExecutor } from "./CallServer";

export type Handler = (call: Call, test: IvrTest) => void;

/** @internal */
export interface TestExecutorEventProbe {
  ivrTestConditionMet: (event: TestConditionMet) => void;
  ivrTestPassed: (event: TestPassed) => void;
  ivrTestFailed: (event: TestFailed) => void;
}

/** @internal */
export class DefaultTestExecutor implements TestExecutor {
  private handlers: Handler[] = [];

  constructor(
    private readonly transcriberFactory: TranscriberFactory,
    private readonly pauseAtEndOfTranscript: number,
    private readonly probe: TestExecutorEventProbe = {
      ivrTestConditionMet: () => undefined,
      ivrTestPassed: () => undefined,
      ivrTestFailed: () => undefined,
    }
  ) {}

  public addHandler(handler: Handler): void {
    this.handlers.push(handler);
  }

  public async startTest(test: IvrTest, call: Call): Promise<IvrTest> {
    for (const handler of this.handlers) {
      handler(call, test);
    }

    const transcriptionHandler = new TranscriptionHandler(
      call.getStream(),
      this.transcriberFactory(),
      this.pauseAtEndOfTranscript
    );

    return new Promise<IvrTest>((resolve, reject) =>
      new TestHandler(call, transcriptionHandler, test)
        .on("ConditionMet", (event: TestConditionMet) => {
          this.probe.ivrTestConditionMet(event);
        })
        .on("TestPassed", (event: TestPassed) => {
          this.probe.ivrTestPassed(event);
          resolve();
        })
        .on("TestFailed", (event: TestFailed) => {
          this.probe.ivrTestFailed(event);
          reject();
        })
    );
  }
}
