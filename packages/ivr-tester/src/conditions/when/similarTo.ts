import { compareTwoStrings } from "string-similarity";
import { When } from "./When";

/**
 * Compares two strings to determine if they're similar.
 * See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.
 *
 * @param similarText - Text that is compared to the transcript for similarity
 * @param similarityThreshold - The degree of similarity is measured in a fraction between 0 and 1.
 * 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.
 */
export const similarTo = (
  similarText: string,
  similarityThreshold = 0.8
): When => (transcript: string) =>
  compareTwoStrings(similarText, transcript) >= similarityThreshold;
