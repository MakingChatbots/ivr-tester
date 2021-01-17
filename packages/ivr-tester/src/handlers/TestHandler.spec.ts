import { IvrTest, TestHandler } from "./TestHandler";
import { EventEmitter } from "events";
import ws from "ws";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { when } from "jest-when";
import { inOrder } from "./inOrder";
import { TwilioCall } from "../call/TwilioCall";
import { contains } from "../testing/conditions/when";
import { doNothing, press } from "../testing/conditions/then";
import { CallTranscriptionEvents } from "../call/transcription/CallTranscriber";
import { Emitter } from "../Emitter";

class WsTestDouble extends EventEmitter implements Pick<ws, "send"> {
  constructor(
    public readonly sendMock: jest.MockedFunction<ws["send"]> = jest.fn()
  ) {
    super();
  }

  public send(
    data: unknown,
    options: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
    cb?: (err?: Error) => void
  ): void;
  // eslint-disable-next-line no-dupe-class-members
  public send(data: unknown, cb?: (err?: Error) => void): void;
  // eslint-disable-next-line no-dupe-class-members
  public send(
    data: unknown,
    cbOrOptions: unknown,
    cb?: (err?: Error) => void
  ): void {
    this.sendMock(data, cbOrOptions, cb);
  }
}

describe("Then response", () => {
  test("payload from Then directive sent to Twilio when condition is met", async () => {
    const transcriptionHandler: Emitter<CallTranscriptionEvents> = new EventEmitter();

    const testWithSingleCondition: IvrTest = {
      name: "",
      test: inOrder([
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

    const webSocket = new WsTestDouble();
    const call = new TwilioCall((webSocket as unknown) as ws, dtmfGenerator);

    new TestHandler(call, transcriptionHandler, testWithSingleCondition);

    webSocket.emit(
      "message",
      JSON.stringify({ event: "start", streamSid: "test-stream-sid" })
    );
    await new Promise((resolve) => setTimeout(resolve, 200));

    transcriptionHandler.emit("transcription", {
      transcription: "Hello World",
      isFinal: true,
    });

    expect(webSocket.sendMock).toHaveBeenCalledWith(
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
  let call: TwilioCall;
  let transcriptionHandler: Emitter<CallTranscriptionEvents>;

  beforeEach(() => {
    transcriptionHandler = new EventEmitter();
    call = new TwilioCall((new WsTestDouble() as unknown) as ws, {
      generate: jest.fn(),
    });
  });

  test("passed event emitted if no conditions", () => {
    const testWithEmptyConditions: IvrTest = {
      name: "",
      test: inOrder([]),
    };

    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithEmptyConditions
    );

    const testPassedListener = jest.fn();
    handler.on("TestPassed", testPassedListener);

    transcriptionHandler.emit("transcription", {
      transcription: "Hello World",
      isFinal: true,
    });

    expect(testPassedListener).toHaveBeenCalled();
  });

  test("passed event emitted if all conditions pass", () => {
    const testWithTwoCondition: IvrTest = {
      name: "",
      test: inOrder([
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

    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithTwoCondition
    );

    const testPassedListener = jest.fn();
    handler.on("TestPassed", testPassedListener);

    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
      isFinal: true,
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
      isFinal: true,
    });

    expect(testPassedListener).toHaveBeenCalled();
  });

  test("failure event emitted if all but last condition fails", () => {
    const testWithTwoConditions: IvrTest = {
      name: "",
      test: inOrder([
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

    const handler = new TestHandler(
      call,
      transcriptionHandler,
      testWithTwoConditions
    );

    const testFailedListener = jest.fn();
    handler.on("TestFailed", testFailedListener);

    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
      isFinal: true,
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
      isFinal: true,
    });

    expect(testFailedListener).toHaveBeenCalled();
  });

  test("failure event emitted if first condition fails", () => {
    const twoConditions: IvrTest = {
      name: "",
      test: inOrder([
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

    const handler = new TestHandler(call, transcriptionHandler, twoConditions);

    const testFailedListener = jest.fn();
    handler.on("TestFailed", testFailedListener);

    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 1",
      isFinal: true,
    });
    transcriptionHandler.emit("transcription", {
      transcription: "Test transcript 2",
      isFinal: true,
    });

    expect(testFailedListener).toHaveBeenCalled();
  });
});
