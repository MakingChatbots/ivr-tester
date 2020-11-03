import { When } from "./When";

export const contains = (partial: string): When => (transcript: string) =>
  transcript.includes(partial);
