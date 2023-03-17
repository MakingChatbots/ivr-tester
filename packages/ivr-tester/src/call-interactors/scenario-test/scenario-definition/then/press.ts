import { Then } from './Then';
import { dtmfSequenceValidator } from '../../../../call-interactor-utilities/dtmf/dtmfSequenceUtils';
import { Call } from '../../../../call/Call';
import {
  DtmfBufferGenerator,
  SupportedTone,
} from '../../../../call-interactor-utilities/dtmf/DtmfBufferGenerator';
import { UlawDtmfBufferGenerator } from '../../../../call-interactor-utilities/dtmf/UlawDtmfBufferGenerator';

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
    do: (call: Call) => call.sendMedia(dtmfGenerator.generate(dtmfSequence)),
    describe: () => {
      return dtmfSequence.length === 1 ? `press key ${dtmfSequence}` : `press keys ${dtmfSequence}`;
    },
  };
};
