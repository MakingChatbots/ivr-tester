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

  recording?: {
    /**
     * Configuration for recording the call's audio
     */
    audio?: {
      outputPath: string;
      filename?: string | FilenameFactory;
    };
    /**
     * Configuration for recording the call's transcription
     */
    transcript?: {
      outputPath: string;
      filename?: string | FilenameFactory;
      /**
       * Includes what you responded with to the prompt
       */
      includeResponse?: boolean;
    };
  };

  /**
   * Port that the server listens on. Defaults to 8080
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
   * How long to wait for any of the calls to be established (in milliseconds) before timing out.
   */
  msTimeoutWaitingForCall?: number | undefined;
}
