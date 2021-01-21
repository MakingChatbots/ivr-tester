import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { FilenameFactory } from "../call/recording/filename/FilenameFactory";
import { Twilio } from "twilio";
import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";

export interface Config {
  /**
   * DTMF tone generator
   */
  dtmfGenerator?: DtmfBufferGenerator;

  /**
   * Factory to create a instance of a transcriber per test
   */
  transcriber: TranscriberFactory;

  /**
   * How long to wait when receiving parts of a transcript to decide
   * whether the transcribing has completed.
   * Defaults to 2 seconds
   */
  msPauseAtEndOfTranscript?: number;

  recording?: {
    outputPath: string;
    filename?: string | FilenameFactory;
  };

  /**
   * Port that the server listens on.
   * This value can be overridden by setting the environment variable LOCAL_SERVER_PORT
   */
  localServerPort?: number | undefined;

  /**
   * Twilio client used to initiate the call to the IVR
   */
  twilioClient?: Twilio;

  /**
   * URL of the server that is publicly accessible. This is the
   * server that Twilio connects to when creating the bi-directional
   * stream of the call
   * This value can be overridden by setting the environment variable PUBLIC_SERVER_URL
   */
  publicServerUrl?: string | undefined;

  /**
   * Plugins that can hook into the lifecycle of a test
   */
  plugins?: IvrTesterPlugin[];
}
