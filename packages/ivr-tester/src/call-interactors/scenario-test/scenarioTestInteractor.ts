import {
  CallTranscriber,
  type TranscriberFactory,
} from '../../call-interactor-utilities/transcription/index.js';
import { Debugger } from '../../Debugger.js';
import type { CallInteractor } from '../CallInteractor.js';
import { defaultPromptFactory, RunningOrderedCallFlowInstructions } from './inOrder.js';
import type { Scenario } from './scenario-definition/Scenario.js';
import { validateScenario } from './validateScenario.js';

export interface ScenarioTestInteractorSuccessResult {
  scenario: Scenario;
  scenarioPassed: true;
}

export interface ScenarioTestInteractorFailedResult {
  scenario: Scenario;
  scenarioPassed: false;
  reasonForFailure: 'timeout' | 'scenario-failed' | 'call-closed-unexpectedly' | 'unknown';
}

export type ScenarioTestInteractorResult =
  | ScenarioTestInteractorSuccessResult
  | ScenarioTestInteractorFailedResult;

export interface ScenarioTestInteractorConfig {
  readonly scenario: Scenario;
  readonly transcriberFactory: TranscriberFactory;
  readonly timeoutSet?: typeof setTimeout;
  readonly timeoutClear?: typeof clearTimeout;
}

/**
 * Checks whether the greeting contains any of a list of strings
 */
export const scenarioTestInteractor = ({
  scenario,
  transcriberFactory,
  timeoutSet = setTimeout,
  timeoutClear = clearTimeout,
}: ScenarioTestInteractorConfig): CallInteractor<ScenarioTestInteractorResult> => {
  const debug = Debugger.getInteractorDebugger();

  const validationResult = validateScenario(scenario);
  if (validationResult.error) {
    throw validationResult.error;
  }
  const validatedScenario = validationResult.scenario;

  return (call) =>
    new Promise((resolve) => {
      const transcriberPlugin = transcriberFactory.create();
      const callTranscriber = new CallTranscriber(call, transcriberPlugin);

      const callFlowSession = new RunningOrderedCallFlowInstructions(
        validatedScenario.steps,
        defaultPromptFactory,
        callTranscriber,
        call,
        timeoutSet,
        timeoutClear,
      );

      let result: ScenarioTestInteractorResult = {
        scenario,
        scenarioPassed: false,
        reasonForFailure: 'unknown',
      };

      callFlowSession.on('progress', (e) => debug('event:progress, payload: %O', e));
      callFlowSession.on('promptMatched', (e) => debug('event:promptMatched, payload: %O', e));
      callFlowSession.on('allPromptsMatched', (e) => {
        debug('event:allPromptsMatched, payload: %O', e);
        result = {
          scenario,
          scenarioPassed: true,
        };
        call.close('all prompts matched');
      });
      callFlowSession.on('timeoutWaitingForMatch', (e) => {
        debug('event:timeoutWaitingForMatch, payload: %O', e);
        result = {
          scenario,
          scenarioPassed: false,
          reasonForFailure: 'timeout',
        };
        call.close('timed out waiting for prompt match');
      });

      callTranscriber.on('callAndTranscriberFinished', (e) => {
        debug('callClosed: %O', e);
        resolve(result);
      });
    });
};
