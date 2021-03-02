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
   * Called early on in the process to ensure the transcriber has
   * everything it needs to work properly e.g. credentials
   */
  checkCanRun: () => Promise<CanRunCheck> | CanRunCheck;

  /**
   * Creates the transcriber. This will be called once per call.
   */
  create: () => TranscriberPlugin;
}
