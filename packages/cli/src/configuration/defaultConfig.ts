import { Config } from "ivr-tester";
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

export const defaultConfig: Config = {
  localServerPort: 8080,
  transcriber: googleSpeechToText({
    languageCode: "en-GB",
    useEnhanced: true,
  }),
};
