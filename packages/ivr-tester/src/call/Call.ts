import ws from "ws";

/**
 * Represents an active call
 */
export interface Call {
  /**
   * Sends DTMF tone to the call
   */
  sendDtmfTone(dtmfSequence: string): void;

  /**
   * Sends 8 bit PCM encoded (MULAW) at 8000 Hertz media to call
   */
  sendMedia(buffer: Buffer): void;

  getStream(): ws;

  hangUp(): void;
}
