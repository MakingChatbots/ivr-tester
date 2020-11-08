import { SpeechClient } from "@google-cloud/speech";
import { TranscriberFactory } from "ivr-tester";
import { MulawGoogleSpeechToText } from "./MulawGoogleSpeechToText";

export const googleSpeechToText = (
  speechPhrases: string[] = [],
  useEnhanced = true,
  speechClient = new SpeechClient()
): TranscriberFactory => () =>
  new MulawGoogleSpeechToText(speechPhrases, useEnhanced, speechClient);
