import type { Then } from './Then.js';

export const doNothing = (): Then => ({
  do: () => {
    // Intentionally empty
  },
  describe: () => 'do nothing',
});
