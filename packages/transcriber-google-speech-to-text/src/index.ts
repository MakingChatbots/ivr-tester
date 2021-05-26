import { SpeechClient } from "@google-cloud/speech";
import { TranscriberFactory } from "ivr-tester";
import { GoogleSpeechToText } from "./GoogleSpeechToText";

/**
 * Options used when starting a transcription stream to Google's Speech-to-Text service. See [Google's documentation
 * for more detailed info](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig)
 */
export interface GoogleSpeechToTextOptions {
  /**
   * Language of the supplied audio as a BCP-47 language tag.
   *
   * See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for a list of the
   * currently supported language codes.
   */
  languageCode?: string;

  /**
   * A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize
   * them. This can be used to improve the accuracy for specific words and phrases.
   */
  speechPhrases?: string[];

  /**
   * Whether to use an enhanced model for speech recognition if it is available for the language code provided.
   *
   * Be aware that [enhanced models cost more](https://cloud.google.com/speech-to-text/docs/enhanced-models).
   */
  useEnhanced?: boolean;
}

/**
 * Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
 * phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.
 */
export const googleSpeechToText = (
  {
    languageCode = "en-US",
    speechPhrases = [],
    useEnhanced = false,
  }: GoogleSpeechToTextOptions = {},
  speechClient = new SpeechClient()
): TranscriberFactory => ({
  create: () =>
    new GoogleSpeechToText(
      languageCode,
      speechPhrases,
      useEnhanced,
      speechClient
    ),
  checkCanRun: async () => {
    try {
      await speechClient.auth.getCredentials();
    } catch (error) {
      return {
        canRun: false,
        reason: `Cannot find Google Speech-to-Text credentials:\n${error.message}`,
      };
    }

    return { canRun: true };
  },
});

export default googleSpeechToText;
