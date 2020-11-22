import { AVAILABLE_REGIONS, LANGUAGES } from "aws-transcribe/dist/types";
import { TranscriberFactory } from "ivr-tester";
import { AmazonTranscribeService } from "./AmazonTranscribe";

/**
 * Factory for creating an Amazon Transcribe transcriber plugin that is preconfigured for
 * phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.
 *
 * @param region - AWS region
 * @param languageCode - Language of the supplied audio as a BCP-47 language tag.
 * @returns Factory for creating an Amazon Transcribe transcriber
 */
export const amazonTranscribe = (
  region: AVAILABLE_REGIONS,
  languageCode: LANGUAGES
): TranscriberFactory => () =>
  new AmazonTranscribeService(region, languageCode);
