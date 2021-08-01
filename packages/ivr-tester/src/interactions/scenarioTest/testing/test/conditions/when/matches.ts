import { When } from "./When";

export const matches = (pattern: RegExp): When => (transcript: string) =>
  pattern.test(transcript);
