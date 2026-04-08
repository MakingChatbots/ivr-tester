import type { CallStreamAdapter } from '../../../../call/CallStreamAdapter';
import type { Then } from './Then';

export const hangUp = (): Then => ({
  do: (call: CallStreamAdapter) => call.close('Then directive'),
  describe: () => 'hang-up',
});
