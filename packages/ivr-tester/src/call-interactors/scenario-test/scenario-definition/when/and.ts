import type { When } from './When.js';

export const and =
  (...whens: When[]): When =>
  (transcript: string) =>
    whens.every((when) => when(transcript));
