import * as fs from "fs";
import path from "path";
import { amazonTranscribe } from "../src";
import { TranscriberPlugin, TranscriptEvent } from "ivr-tester";
import { Debugger } from "../src/Debugger";

const sendAudioChunksToTranscriber = async (
  audioFile: Buffer,
  transcriber: TranscriberPlugin
) => {
  const msBetweenSendingBuffer = 250;
  const bufferSize = 5000;

  // Kludge to slowdown the rate at which data is sent to AWS
  let buffer: number[] = [];
  for (const item of audioFile) {
    buffer.push(item);
    if (buffer.length >= bufferSize) {
      transcriber.transcribe(Buffer.from(buffer));

      buffer = [];
      await new Promise((resolve) =>
        setTimeout(resolve, msBetweenSendingBuffer)
      );
    }
  }
};

jest.setTimeout(60 * 1000);
describe("Amazon Transcribe", () => {
  const audioFilePath = path.join(__dirname, "test-data/mulaw-01.wav");
  let audioFile: Buffer;
  let transcriber: TranscriberPlugin;

  beforeAll(Debugger.enable);

  beforeEach(() => {
    audioFile = fs.readFileSync(audioFilePath);

    transcriber = amazonTranscribe({
      region: "us-east-1",
      languageCode: "en-GB",
    }).create();
  });

  afterEach(() => transcriber.close());

  test("Transcribe mulaw audio even after response marked as completed", async () => {
    const transcriptions: string[] = [];
    transcriber.on("transcription", ({ transcription }: TranscriptEvent) => {
      transcriptions.push(transcription);
    });

    await sendAudioChunksToTranscriber(audioFile, transcriber);
    transcriber.transcriptionComplete();
    await sendAudioChunksToTranscriber(audioFile, transcriber);

    expect(transcriptions.join(" ")).toContain(
      "adjust call recording behaviour"
    );
  });
});
