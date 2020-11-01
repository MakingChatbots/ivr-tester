import { compareTwoStrings } from "string-similarity";

export interface When {
  describe(): string;
  check(transcript: string): boolean;
}

export const or = (...whens: When[]): When => ({
  check: (transcript: string) => whens.some((when) => when.check(transcript)),
  describe: () => `either:\n${whens.map((w) => w.describe()).join("\n")}`,
});

export const matches = (pattern: RegExp): When => ({
  check: (transcript: string) => pattern.test(transcript),
  describe: () => `matches regex pattern ${pattern}`,
});

export const contains = (partial: string): When => ({
  check: (transcript: string) => transcript.includes(partial),
  describe: () => `contains ${partial}`,
});

export const part = (when: When): When => ({
  check: (transcript: string) => {
    const words = transcript.split(" ");
    const totalWords = words.length;

    for (let start = 0; start <= totalWords; start++) {
      for (let end = start; end < totalWords; end++) {
        const sliceOfSentence = words.slice(start, end + 1).join(" ");
        if (when.check(sliceOfSentence)) {
          return true;
        }
      }
    }

    return false;
  },
  describe: () => "", // TODO This pattern has broken down
});

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
): When => ({
  check: (transcript: string) =>
    compareTwoStrings(similarText, transcript) >= similarityThreshold,
  describe: () => `similar to "${similarText}"`,
});
