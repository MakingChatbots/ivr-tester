import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { TranscriberFactory } from "../call/transcription/plugin/TranscriberFactory";
import { FilenameFactory } from "../call/recording/filename/FilenameFactory";
import { Twilio } from "twilio";

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
   * The amount of time to wait, in milliseconds, after the last
   * transcription event before marking the transcription of the
   * IVR's prompt as complete.
   *
   * Default is 5 seconds
   */
  completeTranscriptionTimeoutInMs?: number;

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

  msTimeoutWaitingForCall?: number | undefined;
}
