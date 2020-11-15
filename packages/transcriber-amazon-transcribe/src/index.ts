import { AVAILABLE_REGIONS, LANGUAGES } from "aws-transcribe/dist/types";
import { TranscriberFactory } from "ivr-tester";
import { AmazonTranscribeService } from "./AmazonTranscribe";

export const amazonTranscribe = (
  region: AVAILABLE_REGIONS,
  languageCode: LANGUAGES
): TranscriberFactory => () =>
  new AmazonTranscribeService(region, languageCode);
