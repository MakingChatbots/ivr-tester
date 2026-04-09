import type { CallStreamAdapter } from '../../../../call/CallStreamAdapter.js';
import type { Then } from './Then.js';

export const hangUp = (): Then => ({
  do: (call: CallStreamAdapter) => call.close('Then directive'),
  describe: () => 'hang-up',
});
