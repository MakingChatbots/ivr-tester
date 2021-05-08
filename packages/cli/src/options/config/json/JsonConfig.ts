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

export interface JsonConfigTranscriber {
  /**
   * Name of the transcriber. The default export of the module with the prefix `ivr-tester-transcriber-` will be
   * loaded. e.g. if the name of 'google-speech-to-text' is given then the module
   * 'ivr-tester-transcriber-google-speech-to-text' is used.
   */
  name: string;
  options?: Record<string, unknown>;
}

export interface JsonConfig {
  localServerPort?: number;
  recording?: {
    audio?: JsonConfigRecordingAudio;
    transcript?: JsonConfigRecordingTranscription;
  };
  transcriber: JsonConfigTranscriber;
}
