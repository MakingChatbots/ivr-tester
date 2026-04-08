import type { CallStreamAdapter } from '../../../../call/CallStreamAdapter';
import {
  type DtmfBufferGenerator,
  type SupportedTone,
  UlawDtmfBufferGenerator,
} from '../../../../call-interactor-utilities/dtmf';
import { dtmfSequenceValidator } from '../../../../call-interactor-utilities/dtmf/dtmfSequenceUtils';
import type { Then } from './Then';

/**
 * Sends DTMF tones to the call
 * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
 */
export const press = (
  dtmfSequence: SupportedTone[],
  dtmfGenerator: DtmfBufferGenerator = new UlawDtmfBufferGenerator(),
): Then => {
  const validationResults = dtmfSequenceValidator(dtmfSequence);
  if (validationResults.valid === false) {
    throw new Error(validationResults.reason);
  }

  return {
    do: (call: CallStreamAdapter) => call.sendMedia(dtmfGenerator.generate(dtmfSequence)),
    describe: () => {
      return dtmfSequence.length === 1
        ? `press key ${dtmfSequence.join()}`
        : `press keys ${dtmfSequence.join()}`;
    },
  };
};
