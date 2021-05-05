import { Config } from "ivr-tester";
import { validateConfig } from "./validateJsonConfig";
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

export function configConverter(config: unknown): Config {
  const validationResult = validateConfig(config);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  return {
    transcriber: googleSpeechToText({
      languageCode: "en-GB",
      useEnhanced: true,
    }),
    localServerPort: validationResult.config.localServerPort,
    recording: validationResult.config.recording,
  };
}
