import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DtmfBufferGenerator, SupportedTone } from './DtmfBufferGenerator.js';
import { dtmfSequenceValidator } from './dtmfSequenceUtils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class UlawDtmfBufferGenerator implements DtmfBufferGenerator {
  private static readonly DEFAULT_RAW_BASE_PATH = join(__dirname, './raw/');

  private readonly paths = new Map<SupportedTone, string>();
  private readonly rawCache = new Map<string, Buffer>();

  public constructor(rawFilesBasePath: string = UlawDtmfBufferGenerator.DEFAULT_RAW_BASE_PATH) {
    this.initiatePathsToRawFiles(rawFilesBasePath);
  }

  private initiatePathsToRawFiles(basePath: string) {
    this.paths.set('0', join(basePath, '0.raw'));
    this.paths.set('1', join(basePath, '1.raw'));
    this.paths.set('2', join(basePath, '2.raw'));
    this.paths.set('3', join(basePath, '3.raw'));
    this.paths.set('4', join(basePath, '4.raw'));
    this.paths.set('5', join(basePath, '5.raw'));
    this.paths.set('6', join(basePath, '6.raw'));
    this.paths.set('7', join(basePath, '7.raw'));
    this.paths.set('8', join(basePath, '8.raw'));
    this.paths.set('9', join(basePath, '9.raw'));
    this.paths.set('*', join(basePath, 'asterisk.raw'));
    this.paths.set('#', join(basePath, 'hash.raw'));
    this.paths.set('w', join(basePath, 'w.raw'));
  }

  public generate(digits: SupportedTone[]): Buffer {
    if (digits.length === 0) {
      throw new Error('At least one digit must be provided');
    }

    const validationResults = dtmfSequenceValidator(digits);
    if (validationResults.valid === false) {
      throw new Error(validationResults.reason);
    }

    return Buffer.concat(digits.map((d) => this.getRawBuffer(d)));
  }

  private getRawBuffer(digit: SupportedTone): Buffer {
    if (this.rawCache.has(digit)) {
      return this.rawCache.get(digit);
    }

    const file = readFileSync(this.paths.get(digit));
    this.rawCache.set(digit, file);

    return file;
  }

  public getSupportedTones(): SupportedTone[] {
    return [...this.paths.keys()];
  }
}
