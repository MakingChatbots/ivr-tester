export type SupportedTone =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '*'
  | '#'
  /* w represents a pause of 0.5s */
  | 'w';

/**
 * Implementing class generates stream of DTMF encoded in an 8 bit PCM encoding (MULAW) at 8000 Hertz
 */
export interface DtmfBufferGenerator {
  /**
   * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
   */
  generate(dtmfSequence: SupportedTone[]): Buffer;

  getSupportedTones(): SupportedTone[];
}
