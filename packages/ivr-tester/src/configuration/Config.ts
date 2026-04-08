import type ws from 'ws';
import type { Caller } from '../call/Caller';
import type { CallStreamAdapter } from '../call/CallStreamAdapter';
import type { IvrNumber } from './call/IvrNumber';

export type CallStreamAdapterFactory = (callWebSocket: ws) => CallStreamAdapter;

export interface Config {
  /**
   * Port that the server listens on. Defaults to 8080
   */
  localServerPort?: number | undefined;

  /**
   * Initiates the call. IVR Tester expects a call to this will result a bidirectional
   * WebSocket connection to the publicServerUrl.
   */
  caller: Caller<IvrNumber | Buffer>;

  /**
   * Handles a vendor specific bidirectional audio stream
   */
  callStreamAdapterFactory: CallStreamAdapterFactory;

  /**
   * URL of the server that is publicly accessible. This is the
   * server that Twilio connects to when creating the bidirectional
   * stream of the call
   * This value can be overridden by setting the environment variable PUBLIC_SERVER_URL
   */
  publicServerUrl?: string | undefined;
}
