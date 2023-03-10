import { googleSpeechToText } from '../src';
import * as fs from 'fs';
import { join } from 'path';
import { TranscriberPlugin, TranscriptEvent } from 'ivr-tester';
import { Debugger } from '../src/Debugger';

const sendAudioChunksToTranscriber = async (audioFile: Buffer, transcriber: TranscriberPlugin) => {
  const msBetweenSendingBuffer = 250;
  const bufferSize = 5000;

  // Kludge to slow down the rate at which data is sent to AWS
  let buffer: number[] = [];
  for (const item of Array.from(audioFile)) {
    buffer.push(item);
    if (buffer.length >= bufferSize) {
      transcriber.transcribe(Buffer.from(buffer));

      buffer = [];
      await new Promise((resolve) => setTimeout(resolve, msBetweenSendingBuffer));
    }
  }
};

jest.setTimeout(60 * 1000);
describe('Google Speech-to-Text', () => {
  const audioFilePath = join(__dirname, 'test-data/mulaw-01.wav');
  let audioFile: Buffer;
  let transcriber: TranscriberPlugin;

  beforeAll(Debugger.enable);

  beforeEach(async () => {
    audioFile = fs.readFileSync(audioFilePath);

    transcriber = googleSpeechToText().create();

    const canRunResponse = await googleSpeechToText().checkCanRun();
    if (canRunResponse.canRun === false) {
      throw new Error(canRunResponse.reason);
    }
  });

  afterEach(() => transcriber.close());

  test('Transcribe mulaw audio', async () => {
    transcriber.transcribe(audioFile);

    const transcriptions: string[] = [];
    transcriber.on('transcription', ({ transcription }: TranscriptEvent) => {
      transcriptions.push(transcription);
    });

    await sendAudioChunksToTranscriber(audioFile, transcriber);
    transcriber.transcriptionComplete();
    await sendAudioChunksToTranscriber(audioFile, transcriber);

    expect(transcriptions.join(' ').toLowerCase()).toContain('adjust call recording behavior');
  });
});
