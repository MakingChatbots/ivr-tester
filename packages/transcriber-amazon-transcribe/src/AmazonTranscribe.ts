import {
  TranscriberPlugin,
  TranscriptEvent,
  TranscriptionEvents,
  TypedEmitter,
} from "ivr-tester";
import { AwsTranscribe, StreamingClient } from "aws-transcribe";
import { WaveFile } from "wavefile";
import {
  AVAILABLE_REGIONS,
  LANGUAGES,
  TranscribeStreamConfig,
} from "aws-transcribe/dist/types";
import { Debugger } from "./Debugger";

export class AmazonTranscribe
  extends TypedEmitter<TranscriptionEvents>
  implements TranscriberPlugin {
  private static readonly debug = Debugger.getPackageDebugger();

  private readonly config: TranscribeStreamConfig;

  private stream: StreamingClient;

  constructor(
    private readonly region: AVAILABLE_REGIONS,
    private readonly languageCode: LANGUAGES
  ) {
    super();
    this.config = {
      region: this.region,
      sampleRate: 8000,
      languageCode: this.languageCode,
    };

    AmazonTranscribe.debug("Configuration: %O", this.config);
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
    if (this.stream) {
      return this.stream;
    } else {
      this.stream = this.createStream();
      AmazonTranscribe.debug("New stream created");

      return this.stream;
    }
  }

  private createStream() {
    const client = new AwsTranscribe();
    return client
      .createStreamingClient(this.config)
      .on(StreamingClient.EVENTS.OPEN, () =>
        AmazonTranscribe.debug("Connection with Amazon opened")
      )
      .on(StreamingClient.EVENTS.CLOSE, () =>
        AmazonTranscribe.debug("Connection with Amazon closed")
      )
      .on(StreamingClient.EVENTS.ERROR, (error) => {
        AmazonTranscribe.debug(error);
        throw error;
      })
      .on(StreamingClient.EVENTS.DATA, (data) => {
        AmazonTranscribe.debug("Data: %O", data.Transcript);

        const results = data.Transcript.Results;
        if (!results || results.length === 0) {
          return;
        }

        const result = results[0];

        const event: TranscriptEvent = {
          transcription: result.Alternatives[0].Transcript.trim(),
          isFinal: !result.IsPartial,
        };
        this.emit("transcription", event);
      });
  }

  public close(): void {
    if (this.stream) {
      this.stream.removeAllListeners();
      this.stream.write(Buffer.from([]));
      this.stream.destroy();
      this.stream = null;
      AmazonTranscribe.debug("Stream destroyed");
    }
  }

  public transcribe(payload: Buffer): void {
    const pcmPayload = AmazonTranscribe.convertAudioEncoding(payload);
    this.getStream().write(pcmPayload);
  }

  public transcriptionComplete(): void {
    this.close();
  }
}
