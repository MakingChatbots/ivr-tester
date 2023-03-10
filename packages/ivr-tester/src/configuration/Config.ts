import { Twilio } from 'twilio';
import { TwilioClientAuth } from '../call/twilio/twilio';

export interface Config {
  /**
   * Port that the server listens on. Defaults to 8080
   */
  localServerPort?: number | undefined;

  /**
   * Twilio client used to initiate the call to the IVR or the authentication details
   * to be used by the client
   */
  twilio: Twilio | TwilioClientAuth;

  /**
   * URL of the server that is publicly accessible. This is the
   * server that Twilio connects to when creating the bidirectional
   * stream of the call
   * This value can be overridden by setting the environment variable PUBLIC_SERVER_URL
   */
  publicServerUrl?: string | undefined;
}
