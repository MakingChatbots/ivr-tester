import { compareTwoStrings } from "string-similarity";

export type When = (transcript: string) => boolean;

export const or = (...whens: When[]): When => (transcript: string) =>
  whens.some((when) => when(transcript));

export const matches = (pattern: RegExp): When => (transcript: string) =>
  pattern.test(transcript);

export const contains = (partial: string): When => (transcript: string) =>
  transcript.includes(partial);

export const part = (when: When): When => (transcript: string) => {
  const words = transcript.split(" ");
  const totalWords = words.length;

  for (let start = 0; start <= totalWords; start++) {
    for (let end = start; end < totalWords; end++) {
      const sliceOfSentence = words.slice(start, end + 1).join(" ");
      if (when(sliceOfSentence)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Compares two strings to determine if they're similar.
 * See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.
 *
 * @param {string} similarText Text that is compared to the transcript for similarity
 * @param {number} similarityThreshold The degree of similarity is measured in a fraction between 0 and 1.
 * 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.
 * @return {boolean} True if strings are considered similar, else false
 */
export const similarTo = (
  similarText: string,
  similarityThreshold: number = 0.8
): When => (transcript: string) =>
  compareTwoStrings(similarText, transcript) >= similarityThreshold;
