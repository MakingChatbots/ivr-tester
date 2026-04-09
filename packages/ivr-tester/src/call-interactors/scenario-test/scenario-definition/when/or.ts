import type { When } from './When.js';

export const or =
  (...whens: When[]): When =>
  (transcript: string) =>
    whens.some((when) => when(transcript));
