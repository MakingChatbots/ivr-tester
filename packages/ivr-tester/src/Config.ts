import { DtmfBufferGenerator } from "./dtmf/DtmfPlayer";
import { Transcriber } from "./transcribers/Transcriber";
import { Twilio } from "twilio";
import { StreamDetails } from "./handlers/MediaStreamRecorder";
import { IvrTesterPlugin } from "./plugins/plugin";

/**
 * Factory to create a instance of a transcriber per test
 */
type TranscriberFactory = () => Transcriber;

export interface Config {
  dtmfGenerator?: DtmfBufferGenerator;
  transcriber?: TranscriberFactory;
  recording?: {
    outputPath: string;
    filename?: string | ((stream: StreamDetails) => string);
  };

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
   * Port that server is to listen on.
   * This value can be overridden by setting the environment variable LOCAL_SERVER_PORT
   */
  localServerPort?: number | undefined;
  plugins?: IvrTesterPlugin[];
}
