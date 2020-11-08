import * as fs from "fs";
import path from "path";
import { Transcriber } from "ivr-tester";
import { amazonTranscribe } from "../src";

jest.setTimeout(30 * 1000);
describe("Google Speech-to-Text", () => {
  const msBetweenSendingBuffer = 250;
  const bufferSize = 5000;

  const audioFilePath = path.join(__dirname, "test-data/mulaw-01.wav");
  let transcriber: Transcriber;

  beforeEach(() => {
    transcriber = amazonTranscribe("us-east-1", "en-GB")();
  });

  afterEach(() => transcriber.close());

  test("Transcribe mulaw audio", async () => {
    const transcriptions: string[] = [];
    transcriber.on("transcription", ({ transcription }) => {
      transcriptions.push(transcription);
    });

    const audioFile = fs.readFileSync(audioFilePath);

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

    expect(transcriptions.join(" ")).toContain(
      "adjust call recording behaviour"
    );
  });
});
