import { Call } from "../../call/twilio";
import { Server } from "ws";

export interface CallRequestedEvent {
  call: Call | Buffer;
  total: number;
  current: number;
}

export interface CallRequestErroredEvent {
  error: Error;
}

export interface CallHandlingServerErroredEvent {
  error: Error;
}

export interface CallHandlingServerStartedEvent {
  // TODO Abstract to something with `abortTests`
  server: Server;
}

/**
 * Lifecycle events of setting up a test
 */
export type SetupEvents = {
  callRequested: CallRequestedEvent;
  callRequestErrored: CallRequestErroredEvent;
  callHandlingServerStarted: CallHandlingServerStartedEvent;
  callHandlingServerStopped: undefined;
  callHandlingServerErrored: CallHandlingServerErroredEvent;
};
