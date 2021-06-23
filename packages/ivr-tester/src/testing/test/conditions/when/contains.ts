import { When } from "./When";

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
 * Evaluates whether a transcript contains a piece of text
 *
 * ```ts
 * contains('test')('this is a test transcript') // true
 * ```
 */
export const contains = (
  text: string,
  { ignoreCasing = true }: ContainsConfig = {}
): When => (transcript: string) => containsText(text, transcript, ignoreCasing);
