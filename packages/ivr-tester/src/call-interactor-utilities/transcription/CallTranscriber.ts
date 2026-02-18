import { clearInterval } from 'node:timers';
import type { Call } from '../../call/Call';
import { WebSocketEvents } from '../../call/twilio/TwilioCall';
import {
  TwilioServerMessageEventTypes,
  type TwilioServerMessages,
} from '../../call/twilio/TwilioServerMessages';
import { Debugger } from '../../Debugger';
import { TypedEmitter } from '../../Emitter';
import { type DtmfBufferGenerator, UlawDtmfBufferGenerator } from '../dtmf';
import type {
  TranscriberPlugin,
  TranscriptEvent,
  TranscriptionEvents,
} from './plugin/TranscriberPlugin';

export type CallTranscriberEvents = {
  callAndTranscriberFinished: undefined;
};

export class CallTranscriber extends TypedEmitter<TranscriptionEvents & CallTranscriberEvents> {
  private static debug = Debugger.getPackageDebugger();
  private static TimeToWaitForTranscription = 4000;

  private readonly processMessageRef: (message: string) => void;
  private readonly closeRef: () => void;

  constructor(
    private readonly call: Call,
    private readonly transcriber: TranscriberPlugin,
    private readonly intervalSet: typeof setInterval = setInterval,
    private readonly intervalClear: typeof clearInterval = clearInterval,
    private readonly dtmfGenerator: DtmfBufferGenerator = new UlawDtmfBufferGenerator(),
  ) {
    super();
    this.processMessageRef = this.processMessage.bind(this);
    this.closeRef = this.close.bind(this);
    call
      .getStream()
      .on(WebSocketEvents.Message, this.processMessageRef)
      .on(WebSocketEvents.Close, this.closeRef);

    transcriber.on('transcription', this.collects.bind(this) as typeof this.collects);
  }

  private processMessage(message: string) {
    const data = JSON.parse(message) as TwilioServerMessages;
    if (data.event === TwilioServerMessageEventTypes.Media) {
      this.transcriber.transcribe(Buffer.from(data.media.payload, 'base64'));
    }
  }

  private async close(): Promise<void> {
    this.call
      .getStream()
      .off(WebSocketEvents.Message, this.processMessageRef)
      .off(WebSocketEvents.Close, this.closeRef);

    CallTranscriber.debug('Call closed. Waiting for transcribing to finish');
    await this.waitForTranscriberToStop();
    this.transcriber.close();
    CallTranscriber.debug('Call and transcriber closed');
    this.emit('callAndTranscriberFinished', undefined);
  }

  private async waitForTranscriberToStop(): Promise<void> {
    const twoSecondSilence = this.dtmfGenerator.generate(['w', 'w', 'w', 'w']);

    return new Promise<void>((resolve) => {
      let receivedTranscriptionWithinPeriod = true;

      const transcriptionListener = () => {
        receivedTranscriptionWithinPeriod = true;
        CallTranscriber.debug('Sending silence to prompt transcriber to continue transcribing');
        this.transcriber.transcribe(twoSecondSilence);
      };

      this.transcriber.on('transcription', transcriptionListener);
      this.transcriber.transcribe(twoSecondSilence);

      const intervalTimer = this.intervalSet(() => {
        if (receivedTranscriptionWithinPeriod) {
          receivedTranscriptionWithinPeriod = false;
        } else {
          this.transcriber.off('transcription', transcriptionListener);
          this.intervalClear(intervalTimer);
          resolve();
        }
      }, CallTranscriber.TimeToWaitForTranscription);
    });
  }

  private collects(event: TranscriptEvent) {
    CallTranscriber.debug('Transcript: %s', event.transcription);
    this.emit('transcription', event);
  }
}
