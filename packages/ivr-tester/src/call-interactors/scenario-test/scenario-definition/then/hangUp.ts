import type { Call } from '../../../../call/Call';
import type { Then } from './Then';

export const hangUp = (): Then => ({
  do: (call: Call) => call.close('Then directive'),
  describe: () => 'hang-up',
});
