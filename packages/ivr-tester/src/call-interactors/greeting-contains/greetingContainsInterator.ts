import { CallInteractor } from '../CallInteractor';
import { CallTranscriber, TranscriberFactory } from '../../call-interactor-utilities/transcription';
import { ArgumentUndefinedError } from '../../ArgumentUndefinedError';
import { PromptTranscriptionBuilder } from '../scenario-test/prompts/PromptTranscriptionBuilder';

export interface GreetingMsgInteractorResult {
  foundInGreeting: string[];
  transcription: string;
}

export interface GreetingContainsInteractorConfig {
  /**
   * Maximum time the interactor will listen for the predefined words
   */
  readonly maxTimeToListenMs?: number;
  /**
   * Words that the interactor will listen for. As soon as a word is heard it will close the call.
   */
  readonly wordsToListenFor: string[];
  readonly transcriberFactory: TranscriberFactory;
  readonly intervalSet?: typeof setInterval;
  readonly intervalClear?: typeof clearInterval;
}

/**
 * Checks whether the greeting contains any of a list of strings
 */
export const greetingContainsInteractor = ({
  maxTimeToListenMs = 5000,
  wordsToListenFor,
  transcriberFactory,
  intervalSet = setInterval,
  intervalClear = clearInterval,
}: GreetingContainsInteractorConfig): CallInteractor<GreetingMsgInteractorResult> => {
  if (!wordsToListenFor) {
    throw new ArgumentUndefinedError('wordsToListenFor');
  }
  if (!transcriberFactory) {
    throw new ArgumentUndefinedError('transcriberFactory');
  }

  return (call) =>
    new Promise((resolve) => {
      const foundInGreeting: string[] = [];
      let timeoutRef: NodeJS.Timeout | undefined = undefined;

      function clearTimeout(): void {
        if (timeoutRef) {
          intervalClear(timeoutRef);
          timeoutRef = undefined;
        }
      }

      // Start timer for closing the call
      timeoutRef = intervalSet(() => {
        call.close('Reached maximum listening time without matching a word');
      }, maxTimeToListenMs);

      const promptTranscriptionBuilder = new PromptTranscriptionBuilder();
      const callTranscriber = new CallTranscriber(
        call,
        transcriberFactory.create(),
        intervalSet,
        intervalClear,
      );
      callTranscriber.on('transcription', (t) => {
        promptTranscriptionBuilder.add(t);

        for (const word of wordsToListenFor) {
          if (t.transcription.toUpperCase().includes(word.toUpperCase())) {
            foundInGreeting.push(word);
            clearTimeout();
            call.close('Word found');
          }
        }
      });

      callTranscriber.on('callAndTranscriberFinished', () => {
        clearTimeout();
        resolve({ foundInGreeting, transcription: promptTranscriptionBuilder.merge() });
      });
    });
};
