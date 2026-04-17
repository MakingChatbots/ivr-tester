import { type ChildProcess, spawn } from 'node:child_process';
import type { CallStreamHandler } from '../call-interactors/CallStreamHandler.js';
import { Debugger } from '../Debugger.js';

const debug = Debugger.getSoxUtilityDebugger();

/**
 * Plays audio through the system speakers in real-time using sox.
 *
 * Requires sox to be installed: `brew install sox` (macOS) or `apt install sox` (Linux).
 */
export class SoxAudioPlayer implements CallStreamHandler {
  private proc: ChildProcess;
  private closed = false;

  public constructor() {
    // MULAW 8kHz audio
    this.proc = spawn('play', ['-t', 'raw', '-r', '8000', '-e', 'mu-law', '-c', '1', '-q', '-'], {
      stdio: ['pipe', 'ignore', 'pipe'],
    });

    this.proc.stderr?.on('data', (data: Buffer) => {
      debug('sox stderr: %s', data.toString().trim());
    });

    this.proc.on('error', (err) => {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        debug(
          'sox not found — install it with: brew install sox (macOS) or apt install sox (Linux)',
        );
      } else {
        debug('sox error: %O', err);
      }
    });

    this.proc.on('close', (code) => {
      this.closed = true;
      debug('sox exited with code %d', code);
    });
  }

  public onAudioReceivedFromIvr(buffer: Buffer): void {
    this.write(buffer);
  }

  public onAudioSentToIvr(buffer: Buffer): void {
    this.write(buffer);
  }

  private write(buffer: Buffer): void {
    if (!this.closed) {
      this.proc.stdin?.write(buffer);
    }
  }

  public close(): void {
    if (!this.closed) {
      this.closed = true;
      this.proc.stdin?.end();
    }
  }

  public [Symbol.dispose](): void {
    this.close();
  }
}
