import { TranscriberFactory } from "ivr-tester";
import { AmazonTranscribe } from "./AmazonTranscribe";

/**
 * Options used when starting a transcription stream to Google's Speech-to-Text service. See [Google's documentation
 * for more detailed info](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig)
 */
export interface AmazonTranscribeOptions {
  /**
   * AWS region of the Amazon Transcribe resource
   */
  region: string;

  /**
   * Language of the supplied audio as a BCP-47 language tag.
   */
  languageCode?: string;
}

/**
 * Factory for creating an Amazon Transcribe transcriber plugin that is preconfigured for
 * phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.
 */
export const amazonTranscribe = ({
  region,
  languageCode = "en-US",
}: AmazonTranscribeOptions): TranscriberFactory => ({
  create: () => new AmazonTranscribe(region, languageCode),
  checkCanRun: () => {
    return { canRun: true };
  },
});
