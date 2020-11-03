import { IvrTest, TestHandler } from "./TestHandler";
import { EventEmitter } from "events";
import ws from "ws";
import { DtmfBufferGenerator } from "../dtmf/DtmfPlayer";
import { when } from "jest-when";
import { ordered } from "./ordered";
import { TwilioCall } from "./TwilioCall";
import { contains } from "../conditions/when/contains";
import { press } from "../conditions/then/press";
import { doNothing } from "../conditions/then/doNothing";

class WsTestDouble extends EventEmitter implements Pick<ws, "send"> {
  constructor(
    public readonly sendMock: jest.MockedFunction<ws["send"]> = jest.fn()
  ) {
    super();
  }

  public send(
    data: any,
    options: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
    cb?: (err?: Error) => void
  ): void;
  // eslint-disable-next-line no-dupe-class-members
  public send(data: any, cb?: (err?: Error) => void): void;
  // eslint-disable-next-line no-dupe-class-members
  public send(data: any, cbOrOptions: any, cb?: any): void {
    this.sendMock(data, cbOrOptions, cb);
  }
}

describe("Then response", () => {
  test("payload from Then directive sent to Twilio when condition is met", async () => {
    const transcriptionHandler = new EventEmitter();
    const testWithSingleCondition: IvrTest = {
      name: "",
      test: ordered([
        {
          whenTranscript: contains("Hello"),
          then: press("123"),
        },
      ]),
    };

    const dtmfBuffer = Buffer.from([0, 1, 2, 3]);
    const dtmfGenerator: jest.Mocked<DtmfBufferGenerator> = {
      generate: jest.fn(),
    };
    when(dtmfGenerator.generate).calledWith("123").mockReturnValue(dtmfBuffer);

    const testDouble = new WsTestDouble();
    const call = new TwilioCall((testDouble as any) as ws, dtmfGenerator);

    new TestHandler(call, transcriptionHandler, testWithSingleCondition);

    testDouble.emit(
      "message",
      JSON.stringify({ event: "start", streamSid: "test-stream-sid" })
    );
    await new Promise((resolve) => setTimeout(resolve, 200));

    transcriptionHandler.emit("transcription", {
      transcription: "Hello World",
    });

    expect(testDouble.sendMock).toHaveBeenCalledWith(
      JSON.stringify({
        event: "media",
        streamSid: "test-stream-sid",
        media: {
          payload: dtmfBuffer.toString("base64"),
        },
      }),
      undefined,
      undefined
    );
  });
});

describe("When conditions", () => {
  test("passed event emitted if no conditions", (done) => {
    const transcriptionHandler = new EventEmitter();
    const testWithEmptyConditions: IvrTest = {
      name: "",
      test: ordered([]),
    };

    const call = new TwilioCall((new WsTestDouble() as any) as ws, {
      generate: jest.fn(),
    });

    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithEmptyConditions
    );
    handler.on("TestPassed", () => done());

    transcriptionHandler.emit("transcription", {
      transcription: "Hello World",
    });
  });

  test("passed event emitted if all conditions pass", (done) => {
    const transcriptionHandler = new EventEmitter();
    const testWithTwoCondition: IvrTest = {
      name: "",
      test: ordered([
        {
          whenTranscript: contains("1"),
          then: doNothing(),
        },
        {
          whenTranscript: contains("2"),
          then: doNothing(),
        },
      ]),
    };

    const call = new TwilioCall((new WsTestDouble() as any) as ws, {
      generate: jest.fn(),
    });

    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithTwoCondition
    );

    handler.on("TestPassed", () => done());

    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
    });
  });

  test("failure event emitted if all but last condition fails", (done) => {
    const transcriptionHandler = new EventEmitter();
    const testWithTwoConditions: IvrTest = {
      name: "",
      test: ordered([
        {
          whenTranscript: contains("1"),
          then: doNothing(),
        },
        {
          whenTranscript: contains("3"),
          then: doNothing(),
        },
      ]),
    };

    const call = new TwilioCall((new WsTestDouble() as any) as ws, {
      generate: jest.fn(),
    });
    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithTwoConditions
    );
    handler.on("TestFailed", () => done());

    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
    });
  });

  test("failure event emitted if first condition fails", (done) => {
    const transcriptionHandler = new EventEmitter();
    const twoConditions: IvrTest = {
      name: "",
      test: ordered([
        {
          whenTranscript: contains("3"),
          then: doNothing(),
        },
        {
          whenTranscript: contains("2"),
          then: doNothing(),
        },
      ]),
    };

    const call = new TwilioCall((new WsTestDouble() as any) as ws, {
      generate: jest.fn(),
    });
    const handler = new TestHandler(call, transcriptionHandler, twoConditions);
    handler.on("TestFailed", () => done());
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
    });
  });
});
