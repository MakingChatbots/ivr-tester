import { When } from "./When";

const space = " ";

/**
 * Splits the transcript into parts which are then passed to the argument When.
 *
 * The transcript "press key 1" is split into the following parts, each of which are
 * passed to the argument.
 *   * press
 *   * press key
 *   * press key 1
 *   * key
 *   * key 1
 *   * 1
 *
 * @param when - Called with each of part of the transcript
 */
export const hasPart = (when: When): When => (transcript: string): boolean => {
  const words = transcript.split(space);
  const totalWords = words.length;

  for (let start = 0; start <= totalWords; start++) {
    for (let end = start + 1; end <= totalWords; end++) {
      const sliceOfSentence = words.slice(start, end).join(space);
      if (when(sliceOfSentence)) {
        return true;
      }
    }
  }

  return false;
};
