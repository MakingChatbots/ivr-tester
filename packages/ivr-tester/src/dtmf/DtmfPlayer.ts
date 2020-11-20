/**
 * Generator of DTMF sequences
 * @internal
 */
export interface DtmfBufferGenerator {
  /**
   * @param digits - Supported digits are 0123456789*# and w. w represents a pause of 0.5s.
   */
  generate(digits: string): Buffer;
}
