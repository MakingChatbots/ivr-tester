import { clearInterval } from 'node:timers';
import {
  type DtmfBufferGenerator,
  UlawDtmfBufferGenerator,
} from '../../call-interactor-utilities/dtmf/index.js';
import {
  CallTranscriber,
  type TranscriberFactory,
} from '../../call-interactor-utilities/transcription/index.js';
import { Debugger } from '../../Debugger.js';
import type { CallInteractor } from '../CallInteractor.js';
import { PromptTranscriptionBuilder } from '../scenario-test/prompts/PromptTranscriptionBuilder.js';

export interface ManualInteractorConfig {
  readonly transcriberFactory: TranscriberFactory;
  readonly dtmfGenerator?: DtmfBufferGenerator;
  readonly intervalSet?: typeof setInterval;
  readonly intervalClear?: typeof clearInterval;
}

export const manualInteractor = ({
  transcriberFactory,
  dtmfGenerator = new UlawDtmfBufferGenerator(),
  intervalSet = setInterval,
  intervalClear = clearInterval,
}: ManualInteractorConfig): CallInteractor<void> => {
  const debug = Debugger.getInteractorDebugger();
  return (call) => {
    const transcriberPlugin = transcriberFactory.create();
    const callTranscriber = new CallTranscriber(
      call,
      transcriberPlugin,
      intervalSet,
      intervalClear,
      dtmfGenerator,
    );

    const promptTranscriptionBuilder = new PromptTranscriptionBuilder();
    callTranscriber.on('transcription', (e) => {
      debug('Transcript event: %O', e);
      promptTranscriptionBuilder.add(e);
      console.log(promptTranscriptionBuilder.merge());
    });

    return new Promise((resolve) => callTranscriber.on('callAndTranscriberFinished', resolve));
  };
};
