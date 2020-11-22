import {When, WhenFactory} from "./When";

export const matches:WhenFactory<RegExp> = (pattern): When => (transcript: string) =>
  pattern.test(transcript);
