export interface CallStreamHandler {
  onAudioReceivedFromIvr(buffer: Buffer): void;
  onAudioSentToIvr(buffer: Buffer): void;
}
