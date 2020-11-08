import { EventEmitter } from "events";
import { Transcriber, TranscriptEvent } from "ivr-tester";
import { AwsTranscribe, StreamingClient } from "aws-transcribe";
import { WaveFile } from "wavefile";
import { AVAILABLE_REGIONS, LANGUAGES } from "aws-transcribe/dist/types";

export class AmazonTranscribeService
  extends EventEmitter
  implements Transcriber {
  private transcribeStream: StreamingClient;

  constructor(
    private readonly region: AVAILABLE_REGIONS,
    private readonly languageCode: LANGUAGES
  ) {
    super();
  }

  private static convertAudioEncoding(data: ArrayLike<any>) {
    const wav = new WaveFile();
    wav.fromScratch(1, 8000, "8m", data);
    wav.fromMuLaw();
    // @ts-ignore
    return Buffer.from(wav.data.samples);
  }

  private getStream() {
    if (this.transcribeStream) {
      return this.transcribeStream;
    } else {
      this.transcribeStream = this.createStream();
      return this.transcribeStream;
    }
  }

  private createStream() {
    const client = new AwsTranscribe();
    return (
      client
        .createStreamingClient({
          region: this.region,
          sampleRate: 8000,
          languageCode: this.languageCode,
        })
        // enums for returning the event names which the stream will emit
        .on(StreamingClient.EVENTS.OPEN, () =>
          console.log(`transcribe connection opened`)
        )
        .on(StreamingClient.EVENTS.ERROR, console.error)
        .on(StreamingClient.EVENTS.CLOSE, () =>
          console.log(`transcribe connection closed`)
        )
        .on(StreamingClient.EVENTS.DATA, (data) => {
          const results = data.Transcript.Results;

          if (!results || results.length === 0) {
            return;
          }

          const result = results[0];
          const final = !result.IsPartial;
          const prefix = final ? "recognized" : "recognizing";
          const text = result.Alternatives[0].Transcript;
          console.log(`${prefix} text: ${text}`);

          if (final) {
            const event: TranscriptEvent = {
              transcription: text,
            };
            this.emit("transcription", event);
          }
        })
    );
  }

  close(): void {
    console.log("Closing, sending empty buffer to Transcribe");
    this.transcribeStream.write(Buffer.from([]));
  }

  transcribe(payload: Buffer): void {
    const pcmPayload = AmazonTranscribeService.convertAudioEncoding(payload);
    this.getStream().write(pcmPayload);
  }
}
