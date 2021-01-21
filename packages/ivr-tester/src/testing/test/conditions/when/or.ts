import { When } from "./When";

export const or = (...whens: When[]): When => (transcript: string) =>
  whens.some((when) => when(transcript));
