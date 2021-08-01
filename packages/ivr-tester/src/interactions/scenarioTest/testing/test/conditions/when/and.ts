import { When } from "./When";

export const and = (...whens: When[]): When => (transcript: string) =>
  whens.every((when) => when(transcript));
