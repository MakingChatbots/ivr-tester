import type { Caller } from '../call/Caller';
import type { IvrNumber } from './call/IvrNumber';

export interface Config {
  /**
   * Port that the server listens on. Defaults to 8080
   */
  localServerPort?: number | undefined;

  /**
   * Provides the ability to:
   * 1. Initiate the call
   * 2. Handle the WebSocket callback to the publicServerUrl, for the bidirectional audio stream.
   */
  caller: Caller<IvrNumber | Buffer>;

  /**
   * URL of the server that is publicly accessible. This is the
   * server that Twilio connects to when creating the bidirectional
   * stream of the call
   * This value can be overridden by setting the environment variable PUBLIC_SERVER_URL
   */
  publicServerUrl?: string | undefined;
}
