import { FilenameFactory } from "ivr-tester/dist/call/recording/filename/FilenameFactory";

export interface JsonConfigRecordingAudio {
  outputPath: string;
  filename?: string | FilenameFactory;
}

export interface JsonConfigRecordingTranscription {
  outputPath: string;
  filename?: string | FilenameFactory;
  includeResponse?: boolean;
}

export interface JsonConfig {
  localServerPort?: number;
  recording?: {
    audio?: JsonConfigRecordingAudio;
    transcript?: JsonConfigRecordingTranscription;
  };
}
