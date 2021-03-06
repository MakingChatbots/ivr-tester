import { inOrder } from "./inOrder";
import { contains } from "./conditions/when";
import { press } from "./conditions/then";
import { TranscriberPlugin, TranscriptEvent } from "../../index";
import { Call } from "../../call/Call";
import { EventEmitter } from "events";
import waitForExpect from "wait-for-expect";

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

// TODO Update tests to use Fake Timers https://jestjs.io/docs/en/timer-mocks

describe("ordered conditions", () => {
  let call: jest.Mocked<Call>;
  let transcriberPlugin: TranscriberTestDouble;

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
  });

  test("prompt presses 123 when transcript only contains Hello", async () => {
    const promptContainer = inOrder([
      {
        whenPrompt: contains("Hello"),
        then: press("123"),
        silenceAfterPrompt: 0,
      },
    ]);

    promptContainer.start(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hel",
    });
    expect(call.sendDtmfTone).not.toHaveBeenCalled();

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    await waitForExpect(() => {
      expect(call.sendDtmfTone).toHaveBeenCalledTimes(1);
    });

    expect(call.sendDtmfTone).toHaveBeenCalledWith("123");
  });

  test(`prompt presses 123 when transcript only contains Hello,
  then second prompt presses 321 when transcript only contains World`, async () => {
    const promptContainer = inOrder([
      {
        whenPrompt: contains("Hello"),
        then: press("123"),
        silenceAfterPrompt: 0,
      },
      {
        whenPrompt: contains("World"),
        then: press("321"),
        silenceAfterPrompt: 0,
      },
    ]);

    promptContainer.start(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    await waitForExpect(() => {
      expect(call.sendDtmfTone).toHaveBeenCalledTimes(1);
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Wor",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "World",
    });

    await waitForExpect(() => {
      expect(call.sendDtmfTone).toHaveBeenCalledTimes(2);
    });

    expect(call.sendDtmfTone).toHaveBeenCalledWith("321");
  });

  test(`prompt presses 234 when transcript contains Hello,
  then second prompt presses 345 when transcript contains World within Hello World`, async () => {
    const promptContainer = inOrder([
      {
        whenPrompt: contains("Hello"),
        then: press("234"),
        silenceAfterPrompt: 0,
      },
      {
        whenPrompt: contains("World"),
        then: press("345"),
        silenceAfterPrompt: 0,
      },
    ]);

    promptContainer.start(transcriberPlugin, call);

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello",
    });

    await waitForExpect(() => {
      expect(call.sendDtmfTone).toHaveBeenCalledTimes(1);
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello Wor",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "Hello World",
    });

    await waitForExpect(() => {
      expect(call.sendDtmfTone).toHaveBeenCalledTimes(2);
    });

    expect(call.sendDtmfTone).toHaveBeenCalledWith("345");
  });

  // test("test passes if no conditions provided", () => {
  //   const orderedConditions = inOrder([]);
  //
  //   const testOutcome = orderedConditions.start("Hello", call);
  //
  //   expect(call.sendDtmfTone).not.toHaveBeenCalled();
  //   expect(testOutcome).toMatchObject({
  //     result: "pass",
  //   });
  // });
  //
  // test("all match and test passes for last one", () => {
  //   const conditions: PromptDefinition[] = [
  //     {
  //       whenPrompt: contains("Hello"),
  //       then: press("1"),
  //     },
  //     {
  //       whenPrompt: contains("Jane"),
  //       then: press("2"),
  //     },
  //     {
  //       whenPrompt: contains("Austen"),
  //       then: press("3"),
  //     },
  //   ];
  //
  //   const orderedConditions = inOrder(conditions);
  //
  //   const testOutcome1 = orderedConditions.start("Hello", call);
  //   expect(call.sendDtmfTone).toHaveBeenCalled();
  //   expect(testOutcome1).toMatchObject({
  //     matchedCondition: conditions[0],
  //     result: "continue",
  //   });
  //
  //   const testOutcome2 = orderedConditions.start("Jane", call);
  //   expect(call.sendDtmfTone).toHaveBeenCalled();
  //   expect(testOutcome2).toMatchObject({
  //     matchedCondition: conditions[1],
  //     result: "continue",
  //   });
  //
  //   const testOutcome3 = orderedConditions.start("Austen", call);
  //   expect(call.sendDtmfTone).toHaveBeenCalled();
  //   expect(testOutcome3).toMatchObject({
  //     matchedCondition: conditions[2],
  //     result: "pass",
  //   });
  // });
  //
  // test("test failed when second condition doesn't match", () => {
  //   const conditions: PromptDefinition[] = [
  //     {
  //       whenPrompt: contains("Hello"),
  //       then: press("1"),
  //     },
  //     {
  //       whenPrompt: contains("Jane"),
  //       then: press("2"),
  //     },
  //   ];
  //
  //   const orderedConditions = inOrder(conditions);
  //
  //   const testOutcome1 = orderedConditions.start("Hello", call);
  //   expect(call.sendDtmfTone).toHaveBeenCalled();
  //   expect(testOutcome1).toMatchObject({
  //     matchedCondition: conditions[0],
  //     result: "continue",
  //   });
  //
  //   const testOutcome2 = orderedConditions.start("Darcy", call);
  //   expect(call.sendDtmfTone).toHaveBeenCalled();
  //   expect(testOutcome2).toMatchObject({
  //     result: "fail",
  //   });
  // });
});
