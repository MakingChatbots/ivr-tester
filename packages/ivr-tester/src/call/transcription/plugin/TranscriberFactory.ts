import { TranscriberPlugin } from "./TranscriberPlugin";

export interface CanRun {
  canRun: true;
}

export interface CannotRun {
  canRun: false;
  reason: string;
}

export type CanRunCheck = CanRun | CannotRun;

/**
 * Factory to create a instance of a transcriber per test
 */
export interface TranscriberFactory {
  /**
   * Called on startup to check that the transcriber has
   * everything it needs to work properly when a call is connected
   * e.g. credentials
   */
  checkCanRun: () => Promise<CanRunCheck> | CanRunCheck; // TODO Rename as 'preflightChecks'?

  /**
   * Creates the transcriber. This will be called once per call.
   */
  create: () => TranscriberPlugin;
}
