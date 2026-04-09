import type { When } from './When.js';

/**
 * Always evaluates as true
 */
export const isAnything = (): When => () => true;
