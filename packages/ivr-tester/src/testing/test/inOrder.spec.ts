import {
  inOrder,
  MatchedCallback,
  PromptFactory,
  TimeoutCallback,
} from "./inOrder";
import { contains } from "./conditions/when";
import { press } from "./conditions/then";
import { TranscriberPlugin, TranscriptEvent } from "../../index";
import { Call } from "../../call/Call";
import { EventEmitter } from "events";
import { PostSilencePrompt } from "./PostSilencePrompt";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FakeTimers = require("@sinonjs/fake-timers");

class TranscriberTestDouble extends EventEmitter implements TranscriberPlugin {
  public close(): void {
    //Intentionally empty
  }
  public transcribe(): void {
    //Intentionally empty
  }

  public produceTranscriptionEvent(event: TranscriptEvent): void {
    this.emit("transcription", event);
  }

  public transcriptionComplete(): void {
    //Intentionally empty
  }
}

describe("ordered conditions", () => {
  let call: jest.Mocked<Call>;
  let transcriberPlugin: TranscriberTestDouble;

  let clock: any;
  let testPromptFactory: PromptFactory;
  let matchedCallback: jest.Mocked<MatchedCallback>;
  let timeoutCallback: jest.Mocked<TimeoutCallback>;

  beforeEach(() => {
    call = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
      getStream: jest.fn(),
      close: jest.fn(),
      isOpen: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    };
    transcriberPlugin = new TranscriberTestDouble();

    clock = FakeTimers.createClock();
    matchedCallback = jest.fn();
    timeoutCallback = jest.fn();

    testPromptFactory = (definition, call) =>
      new PostSilencePrompt(
        definition,
        call,
        matchedCallback,
        timeoutCallback,
        clock.setTimeout,
        clock.clearTimeout
      );
  });

  test("prompt presses 123 when transcript eventually contains Hello", () => {
    const silenceAfterPrompt = 1;

    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("123"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hel",
    });

    clock.tick(silenceAfterPrompt);
    expect(call.sendDtmfTone).not.toHaveBeenCalled();

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    clock.tick(silenceAfterPrompt);
    expect(call.sendDtmfTone).toHaveBeenCalledTimes(1);
    expect(call.sendDtmfTone).toHaveBeenCalledWith("123");
  });

  test("prompt does not press 123 when transcript corrected from Hello to Cello", () => {
    const silenceAfterPrompt = 1;

    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("123"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    clock.tick(silenceAfterPrompt / 2);
    expect(call.sendDtmfTone).not.toHaveBeenCalled();

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Cello",
    });

    clock.tick(silenceAfterPrompt);
    expect(call.sendDtmfTone).not.toHaveBeenCalledTimes(1);
  });

  test("Silence After Prompt time reached without match doesn't result in call", () => {
    const silenceAfterPrompt = 1;
    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("123"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hel",
    });

    clock.tick(silenceAfterPrompt);
    expect(call.sendDtmfTone).not.toHaveBeenCalled();

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    clock.tick(silenceAfterPrompt);
    expect(call.sendDtmfTone).toHaveBeenCalledTimes(1);
    expect(call.sendDtmfTone).toHaveBeenCalledWith("123");
  });

  test(`prompt presses 123 when transcript only contains Hello,
  then second prompt presses 321 when transcript only contains World`, () => {
    const silenceAfterPrompt = 1;
    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("123"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
        {
          whenPrompt: contains("World"),
          then: press("321"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    clock.tick(silenceAfterPrompt);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Wor",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "World",
    });

    clock.tick(silenceAfterPrompt);

    expect(call.sendDtmfTone).toHaveBeenCalledTimes(2);
    expect(call.sendDtmfTone).toHaveBeenCalledWith("321");
  });

  test(`prompt presses 234 when transcript contains Hello,
  then second prompt presses 345 when transcript contains World within Hello World`, () => {
    const silenceAfterPrompt = 1;
    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("234"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
        {
          whenPrompt: contains("World"),
          then: press("345"),
          silenceAfterPrompt,
          timeout: silenceAfterPrompt * 2,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    clock.tick(silenceAfterPrompt);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello Wor",
    });

    clock.tick(silenceAfterPrompt);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello World",
    });

    clock.tick(silenceAfterPrompt);

    expect(call.sendDtmfTone).toHaveBeenCalledWith("345");
  });

  test("prompt times out if it does not find match within timeout limit", () => {
    const timeout = 2;
    const promptContainer = inOrder(
      [
        {
          whenPrompt: contains("Hello"),
          then: press("123"),
          silenceAfterPrompt: 1,
          timeout,
        },
      ],
      testPromptFactory
    );

    promptContainer.runAgainstCallFlow(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "World",
    });

    clock.tick(timeout);
    expect(call.sendDtmfTone).not.toHaveBeenCalled();
    expect(timeoutCallback).toHaveBeenCalledWith(
      expect.any(PostSilencePrompt),
      "World"
    );
  });
});
