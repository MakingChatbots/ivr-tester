import { TranscriberPlugin, TranscriptEvent } from "ivr-tester";
import { AwsTranscribe, StreamingClient } from "aws-transcribe";
import { WaveFile } from "wavefile";
import { AVAILABLE_REGIONS, LANGUAGES } from "aws-transcribe/dist/types";
import { EventEmitter } from "events";

/** @internal */
export class AmazonTranscribeService
  extends EventEmitter
  implements TranscriberPlugin {
  private transcribeStream: StreamingClient;

  constructor(
    private readonly region: AVAILABLE_REGIONS,
    private readonly languageCode: LANGUAGES
  ) {
    super();
  }

  private static convertAudioEncoding(data: ArrayLike<unknown>) {
    const wav = new WaveFile();
    wav.fromScratch(1, 8000, "8m", data);
    wav.fromMuLaw();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          const isFinal = !result.IsPartial;
          const transcription = result.Alternatives[0].Transcript;

          const event: TranscriptEvent = {
            transcription,
            isFinal,
          };
          this.emit("transcription", event);
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
