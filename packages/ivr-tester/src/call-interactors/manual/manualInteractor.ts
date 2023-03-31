import { CallInteractor } from '../CallInteractor';
import { DtmfBufferGenerator, UlawDtmfBufferGenerator } from '../../call-interactor-utilities/dtmf';
import { CallTranscriber, TranscriberFactory } from '../../call-interactor-utilities/transcription';
import { PromptTranscriptionBuilder } from '../scenario-test/prompts/PromptTranscriptionBuilder';
import { Debugger } from '../../Debugger';
import { clearInterval } from 'timers';

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
