import { AVAILABLE_REGIONS, LANGUAGES } from "aws-transcribe/dist/types";
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
  region: AVAILABLE_REGIONS;

  /**
   * Language of the supplied audio as a BCP-47 language tag.
   */
  languageCode?: LANGUAGES;
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
    const credentialsDefined =
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;

    if (!credentialsDefined) {
      return {
        canRun: false,
        reason: `Cannot find Amazon Transcribe credentials. Please ensure you define the environment variables:
AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY`,
      };
    }

    return { canRun: true };
  },
});

export default amazonTranscribe;
