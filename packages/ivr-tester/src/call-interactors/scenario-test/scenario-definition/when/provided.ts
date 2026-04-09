import type { When } from './When.js';

/**
 * Progresses when a transcript has been provided, without caring what it says
 */
export const provided = (): When => () => undefined;
