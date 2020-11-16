import { SpeechClient } from "@google-cloud/speech";
import { TranscriberFactory } from "ivr-tester";
import { GoogleSpeechToText } from "./GoogleSpeechToText";

export interface GoogleSpeechToTextOptions {
    languageCode?: string;
    speechPhrases?: string[];
    useEnhanced?: boolean;
}

const defaults: GoogleSpeechToTextOptions = {
    languageCode: "en-US",
    speechPhrases: [],
    useEnhanced: false
}

/**
 * Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
 * phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.
 *
 * @param {object} [options] - Optional. The configuration object. See the subsequent
 *   parameters for more details.
 * @param {string} [options.languageCode] - Required. Language of the supplied audio as a BCP-47 language tag.
 *        Defaults to "en-US". See [Language Support]{@link https://cloud.google.com/speech-to-text/docs/languages} for
 *        a list of the currently supported language codes.
 * @param {string[]} [options.speechPhrases] - Optional. Default empty. A list of strings containing words and phrases "hints" so that the speech
 *        recognition is more likely to recognize them. This can be used to improve the accuracy for specific words and
 *        phrases.
 * @param {string} [options.useEnhanced] - Optional. Default false. Set to true to use an enhanced model for speech recognition if it available
 *        for the language code provided. Be aware that
 *        [enhanced models]{@link https://cloud.google.com/speech-to-text/docs/enhanced-models} are more expensive.
 * @param {object} [speechClient] Service that implements Google Cloud Speech API
 * @return {object} Factory for creating Google Speech-to-Text plugin
 * @see {@link https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig|Google Speech-to-Text's config documentation}
 */
export const googleSpeechToText = (
  options?: GoogleSpeechToTextOptions,
  speechClient = new SpeechClient()
): TranscriberFactory => () => {
    const ops = {
        ...defaults,
        ...options || {},
    }

   return new GoogleSpeechToText(ops.languageCode, ops.speechPhrases, ops.useEnhanced, speechClient);
}
