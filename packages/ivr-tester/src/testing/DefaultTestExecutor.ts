import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { Call } from "../call/Call";
import {
  IvrTest,
  TestConditionMet,
  TestFailed,
  TestHandler,
  TestPassed,
} from "../handlers/TestHandler";
import { CallTranscriber } from "../call/transcription/CallTranscriber";
import { TestExecutor } from "./CallServer";

export type Handler = (call: Call, test: IvrTest) => void;

/** @internal */
export interface TestExecutorEventProbe {
  ivrTranscription: (event: {
    test: IvrTest;
    isFinal: boolean;
    transcription: string;
  }) => void;
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
      ivrTranscription: () => undefined,
      ivrTestConditionMet: () => undefined,
      ivrTestPassed: () => undefined,
      ivrTestFailed: () => undefined,
    }
  ) {}

  public addHandler(handler: Handler): void {
    this.handlers.push(handler);
  }

  private initialiseCustomHandlers(test: IvrTest, call: Call): void {
    for (const handler of this.handlers) {
      handler(call, test);
    }
  }

  public async startTest(test: IvrTest, call: Call): Promise<IvrTest> {
    this.initialiseCustomHandlers(test, call);

    const callTranscriber = new CallTranscriber(
      call,
      this.transcriberFactory(),
      this.pauseAtEndOfTranscript
    );

    callTranscriber.on("transcription", (event) => {
      this.probe.ivrTranscription({ test, ...event });
    });

    return new Promise<IvrTest>((resolve, reject) => {
      return new TestHandler(call, callTranscriber, test)
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
        });
    });
  }
}
