export interface Transcript {
  isFinal: boolean;
  stability: number;
  alternatives: { transcript: string }[];
}
