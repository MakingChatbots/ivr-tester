import { CallInteractor } from '../CallInteractor';
import { CallTranscriber, TranscriberFactory } from '../../call-interactor-utilities/transcription';
import { DtmfBufferGenerator } from '../../call-interactor-utilities/dtmf';
import { validateScenario } from './validateScenario';
import { Scenario } from './scenario-definition/Scenario';
import { defaultPromptFactory, RunningOrderedCallFlowInstructions } from './inOrder';
import { Debugger } from '../../Debugger';

export interface ScenarioTestInteractorConfig {
  readonly scenario: Scenario;
  readonly dtmfGenerator: DtmfBufferGenerator;
  readonly transcriberFactory: TranscriberFactory;
  readonly intervalSet?: typeof setInterval;
  readonly intervalClear?: typeof clearInterval;
}

/**
 * Checks whether the greeting contains any of a list of strings
 */
export const scenarioTestInteractor = ({
  scenario,
  dtmfGenerator,
  transcriberFactory,
  intervalSet = setInterval,
  intervalClear = clearInterval,
}: ScenarioTestInteractorConfig): CallInteractor<void> => {
  const debug = Debugger.getInteractorDebugger();

  const validationResult = validateScenario(scenario);
  if (validationResult.error) {
    throw validationResult.error;
  }
  const validatedScenario = validationResult.scenario;

  return (call) =>
    new Promise((resolve) => {
      let transcriberPlugin = transcriberFactory.create();
      const callTranscriber = new CallTranscriber(call, transcriberPlugin);

      const callFlowSession = new RunningOrderedCallFlowInstructions(
        validatedScenario.steps,
        defaultPromptFactory,
        callTranscriber,
        call,
      );

      callFlowSession.on('progress', (e) => debug('event:progress, payload: %O', e));
      callFlowSession.on('promptMatched', (e) => debug('event:promptMatched, payload: %O', e));
      callFlowSession.on('allPromptsMatched', (e) => {
        debug('event:allPromptsMatched, payload: %O', e);
        call.close('all prompts matched');
      });
      callFlowSession.on('timeoutWaitingForMatch', (e) => {
        debug('event:timeoutWaitingForMatch, payload: %O', e);
        call.close('timed out waiting for prompt match');
      });

      function clearTranscriber(): void {
        if (transcriberPlugin) {
          transcriberPlugin.close();
          transcriberPlugin = undefined;
        }
      }

      call.on('callClosed', (e) => {
        debug('callClosed: %O', e);
        clearTranscriber();
        resolve();
      });
    });
};
