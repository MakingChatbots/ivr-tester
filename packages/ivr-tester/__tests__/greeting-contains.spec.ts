import { afterEach, describe, expect, test, vi } from 'vitest';
import type ws from 'ws';
import WebSocket from 'ws';
import type { Caller, RequestedCall } from '../src/call/Caller.js';
import {
  type CallStreamServerMediaMessage,
  CallStreamServerMessageEventTypes,
  type CallStreamServerStartMessage,
} from '../src/call/CallStreamServerMessages.js';
import { TwilioCallStreamAdapter } from '../src/call/twilio/TwilioCallStreamAdapter.js';
import { TypedEmitter } from '../src/Emitter.js';
import type {
  CallStreamAdapter,
  IvrNumber,
  TranscriberFactory,
  TranscriberPlugin,
  TranscriptEvent,
} from '../src/index.js';
import { greetingContainsInteractor, IvrTester } from '../src/index.js';

/**
 * A Caller that simulates a telephony provider by connecting a WebSocket
 * client to the IvrTester's server and streaming Twilio-formatted messages.
 */
class WebSocketCaller implements Caller<IvrNumber | Buffer> {
  private client: WebSocket | undefined;
  private mediaInterval: ReturnType<typeof setInterval> | undefined;

  public async call(
    call: IvrNumber | Buffer,
    streamUrl: URL | string,
    callId: string,
  ): Promise<RequestedCall> {
    this.client = new WebSocket(streamUrl.toString());
    await new Promise<void>((resolve) => this.client.on('open', resolve));

    // Send Twilio-format Start message containing the callId for routing
    // TODO: Remove unused properties from this generic event type
    this.client.send(
      JSON.stringify({
        event: CallStreamServerMessageEventTypes.Start,
        sequenceNumber: '1',
        streamSid: 'test-stream-sid',
        start: {
          streamSid: 'test-stream-sid',
          accountSid: 'test-account',
          callSid: 'test-call',
          tracks: ['inbound'],
          customParameters: { CallId: callId },
          mediaFormat: { encoding: 'audio/x-mulaw', sampleRate: 8000, channels: 1 },
        },
      } satisfies CallStreamServerStartMessage),
    );

    // Stream media messages periodically so they arrive after CallTranscriber starts listening
    let seq = 2;
    const audioPayload = Buffer.alloc(160).toString('base64');
    this.mediaInterval = setInterval(() => {
      if (this.client?.readyState === WebSocket.OPEN) {
        this.client.send(
          // TODO: Remove unused properties from this generic event type
          JSON.stringify({
            event: CallStreamServerMessageEventTypes.Media,
            media: {
              track: 'inbound' as const,
              chunk: String(seq - 1),
              timestamp: String((seq - 1) * 20),
              payload: audioPayload,
            },
          } satisfies CallStreamServerMediaMessage),
        );
        seq++;
      }
    }, 20);

    this.client.on('close', () => {
      if (this.mediaInterval) {
        clearInterval(this.mediaInterval);
        this.mediaInterval = undefined;
      }
    });

    return { type: 'telephony', call: call as IvrNumber };
  }

  public callStreamReceived(callWebSocket: ws): CallStreamAdapter {
    return new TwilioCallStreamAdapter(callWebSocket);
  }

  public cleanup(): void {
    if (this.mediaInterval) clearInterval(this.mediaInterval);
    if (this.client?.readyState === WebSocket.OPEN) this.client.close();
  }
}

/**
 * A TranscriberPlugin stub that emits a predefined transcription
 * the first time it receives audio data.
 */
class StubTranscriberPlugin
  extends TypedEmitter<{ transcription: TranscriptEvent }>
  implements TranscriberPlugin
{
  private hasEmitted = false;

  public constructor(private readonly transcript: string) {
    super();
  }

  public transcribe(_payload: Buffer): void {
    if (!this.hasEmitted) {
      this.hasEmitted = true;
      this.emit('transcription', {
        isFinal: true,
        transcription: this.transcript,
      });
    }
  }

  public transcriptionComplete(): void {}
  public close(): void {}
}

function createTranscriberFactory(transcript: string): TranscriberFactory {
  return {
    checkCanRun: () => ({ canRun: true as const }),
    create: () => new StubTranscriberPlugin(transcript),
  };
}

/**
 * Wraps setInterval to fire at a fixed fast rate regardless of the
 * requested delay. This avoids waiting for CallTranscriber's 4-second
 * silence-detection intervals during tests.
 */
const fastIntervalSet = ((fn: (...args: unknown[]) => void, _ms: number, ...args: unknown[]) =>
  setInterval(fn, 10, ...args)) as typeof setInterval;

vi.setConfig({ testTimeout: 10 * 1000 });
describe('Caller with WebSocket streaming and greetingContainsInteractor', () => {
  let ivrTester: IvrTester;
  let caller: WebSocketCaller;

  afterEach(async () => {
    caller?.cleanup();
    await ivrTester?.stopServer();
  });

  test('detects a matching word in the transcribed audio stream', async () => {
    caller = new WebSocketCaller();
    ivrTester = new IvrTester(caller);
    await ivrTester.startServer(0);

    const result = await ivrTester.run(
      { subject: { to: '+00000000000', from: '+11111111111' } },
      greetingContainsInteractor({
        wordsToListenFor: ['welcome'],
        transcriberFactory: createTranscriberFactory('Hello welcome to our service'),
        maxTimeToListenMs: 5000,
        intervalSet: fastIntervalSet,
        intervalClear: clearInterval,
      }),
    );

    expect(result.foundInGreeting).toContain('welcome');
    expect(result.transcription).toBe('Hello welcome to our service');
  });

  test('returns empty when greeting does not contain the target word', async () => {
    caller = new WebSocketCaller();
    ivrTester = new IvrTester(caller);
    await ivrTester.startServer(0);

    const result = await ivrTester.run(
      { subject: { to: '+00000000000', from: '+11111111111' } },
      greetingContainsInteractor({
        wordsToListenFor: ['goodbye'],
        transcriberFactory: createTranscriberFactory('Hello welcome to our service'),
        maxTimeToListenMs: 200,
        intervalSet: fastIntervalSet,
        intervalClear: clearInterval,
      }),
    );

    expect(result.foundInGreeting).toEqual([]);
    expect(result.transcription).toBe('Hello welcome to our service');
  });
});
