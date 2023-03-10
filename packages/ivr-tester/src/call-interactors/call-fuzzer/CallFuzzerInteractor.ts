import { CallInteractor } from '../CallInteractor';
import {
  DtmfBufferGenerator,
  SupportedTone,
} from '../../call-interactor-utilities/dtmf/DtmfBufferGenerator';
import { clearTimeout } from 'timers';

function getRandomTone(tones: SupportedTone[]): SupportedTone {
  return tones[Math.floor(Math.random() * tones.length)];
}

export interface CallFuzzerInteractorConfig {
  readonly dtmfGenerator: DtmfBufferGenerator;
  readonly msIntervalBetweenDtmfTones?: number;
  readonly msDuration?: number;
  readonly timeoutSet?: typeof setTimeout;
  readonly timeoutClear?: typeof clearTimeout;
  readonly intervalSet?: typeof setInterval;
  readonly intervalClear?: typeof clearInterval;
}

/**
 * Sends a DTMF tone after specified intervals (default of 1 second)
 */
export const callFuzzerInteractor =
  ({
    dtmfGenerator,
    msIntervalBetweenDtmfTones = 1000,
    msDuration = 5000,
    timeoutSet = setTimeout,
    timeoutClear = clearTimeout,
    intervalSet = setInterval,
    intervalClear = clearInterval,
  }: CallFuzzerInteractorConfig): CallInteractor<void> =>
  (call) =>
    new Promise((resolve) => {
      const intervalRef = intervalSet(() => {
        const randomTone = getRandomTone(dtmfGenerator.getSupportedTones());

        const toneBuffer = dtmfGenerator.generate([randomTone]);
        call.sendMedia(toneBuffer, `dtmf-tone-${randomTone}`);
      }, msIntervalBetweenDtmfTones);

      const timeoutRef = timeoutSet(() => {
        intervalClear(intervalRef);
        call.close('Call Fuzzer Interactor duration exceeded');
      }, msDuration);

      call.on('callClosed', () => {
        intervalClear(intervalRef);
        timeoutClear(timeoutRef);
        resolve();
      });
    });
