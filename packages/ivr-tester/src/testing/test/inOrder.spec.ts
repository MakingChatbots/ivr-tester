import { EventEmitter } from "node:events";
import FakeTimers from "@sinonjs/fake-timers";
import { beforeEach, describe, expect, type Mocked, test, vi } from "vitest";
import type { Call } from "../../call/Call";
import type { TranscriberPlugin, TranscriptEvent } from "../../index";
import { press } from "./conditions/then";
import { contains } from "./conditions/when";
import {
  inOrder,
  type MatchedCallback,
  type PromptFactory,
  type TimeoutCallback,
} from "./inOrder";
import { PostSilencePrompt } from "./PostSilencePrompt";

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
  let call: Mocked<Call>;
  let transcriberPlugin: TranscriberTestDouble;

  let clock: any;
  let testPromptFactory: PromptFactory;
  let matchedCallback: Mocked<MatchedCallback>;
  let timeoutCallback: Mocked<TimeoutCallback>;

  beforeEach(() => {
    call = {
      sendDtmfTone: vi.fn(),
      sendMedia: vi.fn(),
      getStream: vi.fn(),
      close: vi.fn(),
      isOpen: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    };
    transcriberPlugin = new TranscriberTestDouble();

    clock = FakeTimers.createClock();
    matchedCallback = vi.fn();
    timeoutCallback = vi.fn();

    testPromptFactory = (definition, call) =>
      new PostSilencePrompt(
        definition,
        call,
        matchedCallback,
        timeoutCallback,
        clock.setTimeout,
        clock.clearTimeout,
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
      testPromptFactory,
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
      testPromptFactory,
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
      testPromptFactory,
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
      testPromptFactory,
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
      testPromptFactory,
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
      testPromptFactory,
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
      "World",
    );
  });
});
