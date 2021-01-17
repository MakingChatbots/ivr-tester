import { CallTranscriber, CallTranscriptionEvent } from "./CallTranscriber";
import { Call } from "../Call";
import { TranscriberPlugin, TranscriptEvent } from "./plugin/TranscriberPlugin";
import { EventEmitter } from "events";

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

describe("Call Transcriber", () => {
  const oneSecondInterval = 1000;

  let callTranscriber: CallTranscriber;
  let transcriberPlugin: TranscriberTestDouble;

  beforeEach(() => {
    transcriberPlugin = new TranscriberTestDouble();
    const call: jest.Mocked<Call> = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
      getStream: jest
        .fn()
        .mockReturnValue({ on: jest.fn().mockReturnValue({ on: jest.fn() }) }),
      hangUp: jest.fn(),
    };

    callTranscriber = new CallTranscriber(
      call,
      transcriberPlugin,
      oneSecondInterval
    );
  });

  test("transcriber told transcription completed after final transcription", async () => {
    jest.spyOn(transcriberPlugin, "transcriptionComplete");

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: true,
      transcription: "this is final.",
    });

    await new Promise<CallTranscriptionEvent>((resolve) => {
      callTranscriber.on("transcription", resolve);
    });

    expect(transcriberPlugin.transcriptionComplete).toHaveBeenCalled();
  });

  test("final transcriptions are concatenated after X", async () => {
    transcriberPlugin.produceTranscriptionEvent({
      isFinal: true,
      transcription: "this is final.",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: true,
      transcription: "this is final too",
    });

    const transcription = await new Promise<CallTranscriptionEvent>(
      (resolve) => {
        callTranscriber.on("transcription", resolve);
      }
    );

    expect(transcription).toStrictEqual({
      isFinal: true,
      transcription: "this is final. this is final too",
    });
  });

  test("latest partial transcription returned after X", async () => {
    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "first partial",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "second partial",
    });

    const transcription = await new Promise<CallTranscriptionEvent>(
      (resolve) => {
        callTranscriber.on("transcription", resolve);
      }
    );

    expect(transcription).toStrictEqual({
      isFinal: true,
      transcription: "second partial",
    });
  });

  test("final transcription concatenated with latest partial transcription after X", async () => {
    transcriberPlugin.produceTranscriptionEvent({
      isFinal: true,
      transcription: "final sentence",
    });

    transcriberPlugin.produceTranscriptionEvent({
      isFinal: false,
      transcription: "latest partial",
    });

    const transcription = await new Promise<CallTranscriptionEvent>(
      (resolve) => {
        callTranscriber.on("transcription", resolve);
      }
    );

    expect(transcription).toStrictEqual({
      isFinal: true,
      transcription: "final sentence latest partial",
    });
  });
});
