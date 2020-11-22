import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { StreamDetails } from "../call/recording/MediaStreamRecorder";
import { FilenameFactory } from "../call/recording/filename/FilenameFactory";

export interface ServerConfig {
  dtmfGenerator?: DtmfBufferGenerator;

  transcriber: TranscriberFactory;

  /**
   * How long to wait when receiving parts of a transcript to decide
   * whether the transcribing has completed
   */
  pauseAtEndOfTranscript?: number;

  recording?: {
    outputPath: string;
    filename?: string | FilenameFactory;
  };

  /**
   * Port that the server listens on.
   * This value can be overridden by setting the environment variable LOCAL_SERVER_PORT
   */
  localServerPort?: number | undefined;
}
