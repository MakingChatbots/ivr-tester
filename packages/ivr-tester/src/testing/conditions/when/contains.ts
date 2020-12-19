import { When } from "./When";
import { hasPart } from "./hasPart";

export interface containsConfig {
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
 * Evaluates whether a transcript contains either a piece of text or if
 * passed a When condition will pass then When condition every portion of
 * the transcript until it returns true, else will return false.
 *
 * ```
 * contains('test')('this is a test transcript') // true
 * ```
 *
 * ```
 * contains(similarTo('this is a best'))('this is a test transcript') // true
 * ```
 */
export const contains = (
  partialOrWhen: string | When,
  { ignoreCasing = true }: containsConfig = {}
): When => (transcript: string) => {
  if (typeof partialOrWhen === "string") {
    return containsText(partialOrWhen, transcript, ignoreCasing);
  }

  return hasPart(partialOrWhen)(transcript);
};
