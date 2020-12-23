/**
 * Implementing class generates stream of DTMF encoded in an 8 bit PCM encoding (MULAW) at 8000 Hertz
 */
export interface DtmfBufferGenerator {
  /**
   * @param dtmfSequence - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
   */
  generate(dtmfSequence: string): Buffer;
}
