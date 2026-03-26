import { CallFuzzerInteraction } from "./CallFuzzerInteraction";
import { Emitter, TypedEmitter } from "../Emitter";
import { IvrTesterExecution, IvrTesterLifecycleEvents } from "../IvrTester";
import { Ui } from "./Ui";
import { Call, CallEvents } from "../call/Call";
import WebSocket from "ws";
import { TranscriptionEvents } from "../call/transcription/plugin/TranscriberPlugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const FakeTimers = require("@sinonjs/fake-timers");

class CallTestDouble extends TypedEmitter<CallEvents> implements Call {
  public description: string;

  constructor() {
    super();
  }

  public sendDtmfTone(): void {
    // Intentionally empty
  }

  public close(): void {
    // Intentionally empty
  }

  public getStream(): WebSocket {
    return undefined;
  }

  public getTranscriber(): TypedEmitter<TranscriptionEvents> {
    return undefined;
  }

  public isOpen(): boolean {
    return false;
  }

  public sendMedia(): void {
    // Intentionally empty
  }
}

describe("CallFuzzerInteraction", () => {
  let clock: any;

  let ui: Ui;
  let lifecycleEventsEmitter: Emitter<IvrTesterLifecycleEvents>;
  let execution: IvrTesterExecution;

  const mockClearInterval: jest.Mocked<typeof clearInterval> = jest.fn();

  beforeEach(() => {
    clock = FakeTimers.createClock();

    ui = {
      reportProgressUpdate: jest.fn(),
      reportError: jest.fn(),
    };

    lifecycleEventsEmitter = new TypedEmitter<IvrTesterLifecycleEvents>();
    execution = {
      lifecycleEvents: lifecycleEventsEmitter,
      stop: jest.fn(),
    };
  });

  test("DTMF tone is sent after every interval", () => {
    const msIntervalBetweenDtmfTones = 1;

    new CallFuzzerInteraction(
      msIntervalBetweenDtmfTones,
      clock.setInterval,
      mockClearInterval
    ).initialise(execution, ui);

    const call = new CallTestDouble();
    jest.spyOn(call, "sendDtmfTone");

    lifecycleEventsEmitter.emit("callConnected", { call });
    call.emit("callMediaStreamStarted", {
      fromNumber: "",
      toNumber: "",
      streamSid: "",
    });

    expect(call.sendDtmfTone).toBeCalledTimes(0);
    clock.tick(msIntervalBetweenDtmfTones);
    expect(call.sendDtmfTone).toBeCalledTimes(1);
    clock.tick(msIntervalBetweenDtmfTones);
    expect(call.sendDtmfTone).toBeCalledTimes(2);
  });

  test("Sending DTMF tones is stopped on shutdown", () => {
    const interaction = new CallFuzzerInteraction(
      1,
      clock.setInterval,
      mockClearInterval
    );
    interaction.initialise(execution, ui);

    const call = new CallTestDouble();
    lifecycleEventsEmitter.emit("callConnected", { call });
    call.emit("callMediaStreamStarted", {
      fromNumber: "",
      toNumber: "",
      streamSid: "",
    });

    interaction.shutdown();
    expect(mockClearInterval).toHaveBeenCalled();
  });

  test("Sending DTMF tones is stopped when call closed", () => {
    new CallFuzzerInteraction(
      1,
      clock.setInterval,
      mockClearInterval
    ).initialise(execution, ui);

    const call = new CallTestDouble();
    lifecycleEventsEmitter.emit("callConnected", { call });
    call.emit("callMediaStreamStarted", {
      fromNumber: "",
      toNumber: "",
      streamSid: "",
    });

    call.emit("callClosed", { by: "caller" });
    expect(mockClearInterval).toHaveBeenCalled();
  });

  test("UI progress reports contain Time and DTMF tone", () => {
    const msIntervalBetweenDtmfTones = 1;

    new CallFuzzerInteraction(
      msIntervalBetweenDtmfTones,
      clock.setInterval
    ).initialise(execution, ui);

    const call = new CallTestDouble();
    lifecycleEventsEmitter.emit("callConnected", { call });
    call.emit("callMediaStreamStarted", {
      fromNumber: "",
      toNumber: "",
      streamSid: "",
    });

    clock.tick(msIntervalBetweenDtmfTones);
    expect(ui.reportProgressUpdate).toBeCalledWith(
      expect.stringMatching(/^\d+:\d+:\d+: Pressed tone '.'/)
    );
  });
});
