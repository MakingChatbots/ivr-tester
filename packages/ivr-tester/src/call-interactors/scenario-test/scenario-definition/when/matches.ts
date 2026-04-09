import type { When } from './When.js';

export const matches =
  (pattern: RegExp): When =>
  (transcript: string) =>
    pattern.test(transcript);
