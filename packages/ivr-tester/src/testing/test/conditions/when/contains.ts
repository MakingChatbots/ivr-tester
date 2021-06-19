import { When } from "./When";
import { hasPart } from "./hasPart";

export interface ContainsConfig {
  ignoreCasing?: boolean;
}

const containsText = (
  partial: string,
  transcript: string,
  ignoreCasing: boolean
) =>
  ignoreCasing
    ? transcript.toLowerCase().includes(partial.toLowerCase())
    : transcript.includes(partial);

/**
 * Evaluates whether a transcript contains
 * * A piece of text if a string is provided
 * * Every piece of text if array is provided
 * * When condition passes, having been passed every portion of
 *   the transcript until it returns true, else will return false.
 *
 * ```ts
 * contains(['test', 'transcript'])('this is a test transcript') //true
 * ```
 *
 * ```ts
 * contains('test')('this is a test transcript') // true
 * ```
 *
 * ```ts
 * contains(similarTo('this is the test'))('this is the best transcript') // true
 * ```
 */
export const contains = (
  partialOrWhen: string | string[] | When,
  { ignoreCasing = true }: ContainsConfig = {}
): When => (transcript: string) => {
  if (typeof partialOrWhen === "string") {
    return containsText(partialOrWhen, transcript, ignoreCasing);
  }

  if (Array.isArray(partialOrWhen)) {
    return partialOrWhen.every((text) =>
      containsText(text, transcript, ignoreCasing)
    );
  }

  return hasPart(partialOrWhen)(transcript);
};
