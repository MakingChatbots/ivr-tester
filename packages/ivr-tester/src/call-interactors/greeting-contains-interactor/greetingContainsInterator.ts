import { CallInteractor } from '../CallInteractor';
import { TranscriberPlugin } from '../../call-interactor-utilities/transcription/plugin/TranscriberPlugin';
import { CallTranscriber } from '../../call-interactor-utilities/transcription/CallTranscriber';
import { TranscriberFactory } from '../../call-interactor-utilities/transcription/plugin/TranscriberFactory';
import { ArgumentUndefinedError } from '../../ArgumentUndefinedError';

export interface GreetingMsgInteractorResult {
  foundInGreeting: string[];
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
      let transcriberPlugin: TranscriberPlugin | undefined = undefined;

      function clearTimeout(): void {
        if (timeoutRef) {
          intervalClear(timeoutRef);
          timeoutRef = undefined;
        }
      }

      function clearTranscriber(): void {
        if (transcriberPlugin) {
          transcriberPlugin.close();
          transcriberPlugin = undefined;
        }
      }

      // Start timer for closing the call
      timeoutRef = intervalSet(() => {
        call.close('Reached maximum listening time without matching a word');
      }, maxTimeToListenMs);

      const callTranscriber = new CallTranscriber(call, transcriberFactory.create());
      callTranscriber.on('transcription', (t) => {
        for (const word of wordsToListenFor) {
          if (t.transcription.toUpperCase().includes(word.toUpperCase())) {
            foundInGreeting.push(word);
            clearTimeout();
            call.close('Word found');
          }
        }
      });

      call.on('callClosed', () => {
        clearTimeout();
        clearTranscriber();
        resolve({ foundInGreeting });
      });
    });
};
