import * as fs from "fs";
import path from "path";
import {TranscriptEvent} from "ivr-tester";
import {amazonTranscribe, AmazonTranscribeService} from "../src/AmazonTranscribe";
// import {Transform} from "stream";

jest.setTimeout(80 * 1000);
describe("Google Speech-to-Text", () => {
    const audioFilePath = path.join(__dirname, "test-data/mulaw-01.wav");
    let transcriber: AmazonTranscribeService;

    beforeEach(() => {


    });

    afterEach(() => transcriber.close());

    test("Transcribe mulaw audio", async () => {
      process.env.AWS_REGION = "us-east-1";

        const audioFileStream = fs.createReadStream(audioFilePath);
        // const abc = audioFileStream.pipe(new Transform({
        //     transform: (chunk, encoding, callback) => callback(null, chunk.toString('base64'))
        // }));

        // transcriber.transcribe(audioFile.toString("base64"));
        const transcriberFactory = amazonTranscribe();
        transcriber = transcriberFactory(audioFileStream);

        const {transcription}: TranscriptEvent = await new Promise((resolve) =>
            transcriber.on("transcription", resolve)
        );
        expect(transcription).toContain("this will allow you");
    });
});
