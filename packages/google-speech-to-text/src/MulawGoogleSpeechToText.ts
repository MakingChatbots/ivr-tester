import { EventEmitter } from "events";
import { protos, SpeechClient } from "@google-cloud/speech";
import { Transcriber, TranscriptEvent } from "ivr-tester";
import { Transcript } from "./Transcript";

export class MulawGoogleSpeechToText
  extends EventEmitter
  implements Transcriber {
  private static createConfig(
    speechPhrases: string[],
    useEnhanced: boolean
  ): Readonly<protos.google.cloud.speech.v1.IStreamingRecognitionConfig> {
    return {
      config: {
        encoding:
          protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.MULAW,
        sampleRateHertz: 8000,
        languageCode: "en-GB",
        model: "phone_call",
        speechContexts: [{ phrases: speechPhrases }],
        useEnhanced,
      },
      interimResults: false, // TODO Because this is false I can remove the isFinal check elsewhere
      singleUtterance: false,
    };
  }

  readonly #config: Readonly<
    protos.google.cloud.speech.v1.IStreamingRecognitionConfig
  >;
  #stream: any; // TODO Type this
  #streamCreatedAt: Date;

  constructor(
    private speechPhrases: string[] = [],
    private useEnhanced = true,
    private readonly speechClient = new SpeechClient()
  ) {
    super();
    this.#config = MulawGoogleSpeechToText.createConfig(
      speechPhrases,
      useEnhanced
    );
  }

  public transcribe(payload: string) {
    this.getStream().write(payload);
  }

  public close() {
    if (this.#stream) {
      this.#stream.destroy();
    }
  }

  private newStreamRequired() {
    if (!this.#stream) {
      return true;
    } else {
      const now = new Date();
      const timeSinceStreamCreated =
        now.valueOf() - this.#streamCreatedAt.valueOf();
      return timeSinceStreamCreated / 1000 > 60;
    }
  }

  public getStream() {
    if (this.newStreamRequired()) {
      if (this.#stream) {
        this.#stream.destroy();
      }

      this.#streamCreatedAt = new Date();
      this.#stream = this.speechClient
        .streamingRecognize(this.#config)
        .on("error", console.error)
        .on("data", (data: { results: Transcript[] }) => {
          const result = data.results[0];
          if (result?.alternatives[0] !== undefined) {
            const event: TranscriptEvent = {
              transcription: result.alternatives[0].transcript.trim(),
            };
            this.emit("transcription", event);
          }
        });
    }

    return this.#stream;
  }
}

export const googleSpeechToText = (
  speechPhrases: string[] = [],
  useEnhanced = true,
  speechClient = new SpeechClient()
) => () =>
  new MulawGoogleSpeechToText(speechPhrases, useEnhanced, speechClient);
