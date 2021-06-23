import { When } from "./When";
import { similarTo } from "./similarTo";
import { hasPart } from "./hasPart";

/**
 * Determines if there is a section of the transcript that is similar to a piece of text.
 *
 * This is case-insensitive.
 *
 * See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.
 *
 * ```ts
 * containsSimilarTo('this is the test'))('this is the best transcript') // true
 * ```
 *
 * @param similarText - Text that is compared to the contents of the transcript for similarity
 * @param similarityThreshold - The degree of similarity is measured in a fraction between 0 and 1.
 * 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.
 */
export const containsSimilarTo = (
  similarText: string,
  similarityThreshold = 0.8
): When => (transcript: string) =>
  hasPart(similarTo(similarText, similarityThreshold))(transcript);
