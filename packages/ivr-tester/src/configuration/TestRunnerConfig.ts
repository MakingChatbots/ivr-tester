import { Twilio } from "twilio";
import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";

export interface TestRunnerConfig {
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

  plugins?: IvrTesterPlugin[];
}
