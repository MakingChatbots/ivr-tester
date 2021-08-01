export interface IvrTesterController {
  /**
   * Stops the test runner
   * @param failure - Whether the running being stopped was due to a failure
   *                e.g. some component failed to start, or a test failed
   */
  stop(failure?: boolean, reason: string): void;
}

type OnStopCallback = (failure: boolean) => void;
export interface TestRunnerManager {
  setOnStopCallback: (cb: OnStopCallback) => void;
  testRunner: IvrTesterController;
}

export function createTestRunnerManager(): TestRunnerManager {
  let callback: OnStopCallback = undefined;
  let stopped = false;
  let stoppedDueToFailure = false;

  return {
    setOnStopCallback(cb: OnStopCallback) {
      callback = cb;
      if (stopped) {
        callback(stoppedDueToFailure);
      }
    },
    testRunner: {
      stop(failure = false) {
        stopped = true;
        stoppedDueToFailure = failure;

        if (callback) {
          callback(stoppedDueToFailure);
        }
      },
    },
  };
}
