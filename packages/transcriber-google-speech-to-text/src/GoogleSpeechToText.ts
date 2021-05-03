import { protos, SpeechClient } from "@google-cloud/speech";
import {
  TranscriberPlugin,
  TranscriptEvent,
  TranscriptionEvents,
  TypedEmitter,
} from "ivr-tester";
import { Transcript } from "./Transcript";
import internal from "stream";
import { Debugger } from "./Debugger";

export class GoogleSpeechToText
  extends TypedEmitter<TranscriptionEvents>
  implements TranscriberPlugin {
  private static readonly debug = Debugger.getPackageDebugger();

  private static createConfig(
    languageCode: string,
    speechPhrases: string[],
    useEnhanced: boolean
  ): Readonly<protos.google.cloud.speech.v1.IStreamingRecognitionConfig> {
    return {
      config: {
        encoding:
          protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.MULAW,
        sampleRateHertz: 8000,
        languageCode,
        model: "phone_call",
        speechContexts: [{ phrases: speechPhrases }],
        useEnhanced,
      },
      interimResults: true,
      singleUtterance: false,
    };
  }

  private readonly config: Readonly<protos.google.cloud.speech.v1.IStreamingRecognitionConfig>;
  private stream: internal.Writable;

  constructor(
    languageCode: string,
    speechPhrases: string[] = [],
    useEnhanced = false,
    private readonly speechClient = new SpeechClient()
  ) {
    super();
    this.config = GoogleSpeechToText.createConfig(
      languageCode,
      speechPhrases,
      useEnhanced
    );

    GoogleSpeechToText.debug("Configuration: %O", this.config);
  }

  public transcribe(payload: Buffer): void {
    this.getStream().write(payload.toString("base64"));
  }

  public close(): void {
    if (this.stream) {
      this.stream.removeAllListeners();
      this.stream.write(Buffer.from([]));
      this.stream.destroy();
      this.stream = null;
      GoogleSpeechToText.debug("Stream destroyed");
    }
  }

  private createStream(): internal.Writable {
    return (this.stream = this.speechClient
      .streamingRecognize(this.config)
      .on("error", (error) => {
        GoogleSpeechToText.debug(error);
        this.stream.removeAllListeners();
        this.stream.destroy();
        this.stream = null;
      })
      .on("data", (data: { results: Transcript[] }) => {
        GoogleSpeechToText.debug("Data: %O", data);

        const result = data.results[0];
        if (result?.alternatives[0] !== undefined) {
          const event: TranscriptEvent = {
            transcription: result.alternatives[0].transcript.trim(),
            isFinal: result.isFinal,
          };
          GoogleSpeechToText.debug("Emitted: %O", event);
          this.emit("transcription", event);
        }
      }));
  }

  public getStream(): internal.Writable {
    if (!this.stream) {
      this.stream = this.createStream();
    }
    return this.stream;
  }

  public transcriptionComplete(): void {
    this.close();
  }
}
