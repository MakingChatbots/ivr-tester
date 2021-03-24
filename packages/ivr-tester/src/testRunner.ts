import { TwilioCallServer } from "./testing/TwilioCallServer";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { populateDefaults } from "./configuration/populateDefaults";
import { TwilioCaller } from "./call/TwilioCaller";
import { IteratingTestAssigner } from "./testing/IteratingTestAssigner";
import { mediaStreamRecorderPlugin } from "./call/recording/MediaStreamRecorder";
import { testExecutor } from "./testing/TestExecutor";
import { AudioPlaybackCaller } from "./call/AudioPlaybackCaller";
import { Caller } from "./call/Caller";
import { consoleUserInterface } from "./testing/ui/consoleUserInterface";
import { StopTestRunnerWhenTestsComplete } from "./testing/StopTestRunnerWhenTestsComplete";
import { CallFlowSession } from "./testing/test/CallFlowInstructions";
import { callConnectedTimeout } from "./testing/callConnectedTimeout";
import { Call } from "./call/Call";
import { transcriptRecorderPlugin } from "./call/recording/TranscriptRecorder";
import { Scenario } from "./testing/scenario/Scenario";

export interface TestSubject {
  from: string;
  to: string;
}

export interface TestSession {
  readonly scenario: Scenario;
  readonly call: Call;
  readonly callFlowSession: CallFlowSession;
}

export interface TestRunner {
  /**
   * Stops the test runner
   * @param failure - Whether the running being stopped was due to a failure
   *                e.g. some component failed to start, or a test failed
   */
  stop(failure?: boolean): void;
}

type OnStopCallback = (failure: boolean) => void;
export interface TestRunnerManager {
  setOnStopCallback: (cb: OnStopCallback) => void;
  testRunner: TestRunner;
}

function createTestRunnerManager(): TestRunnerManager {
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

function createPluginManager(config: Config): PluginManager {
  const userInterface = consoleUserInterface();

  return new PluginManager([
    new StopTestRunnerWhenTestsComplete(),
    userInterface,
    callConnectedTimeout(config, userInterface),
    mediaStreamRecorderPlugin(config),
    transcriptRecorderPlugin(config),
  ]);
}

export class IvrTester {
  private readonly config: Config;
  private readonly pluginManager: PluginManager;
  private running = false;

  constructor(configuration: Config) {
    this.config = populateDefaults(configuration);
    this.pluginManager = createPluginManager(this.config);
  }

  public async run(
    call: TestSubject | Buffer,
    scenario: Scenario[] | Scenario
  ): Promise<void> {
    if (this.running) {
      throw new Error(
        "Instance of IvrTester can only run a single suite of scenarios"
      );
    }
    this.running = true;

    const scenarios = Array.isArray(scenario) ? scenario : [scenario];

    await this.preflightChecks();

    const callServer = new TwilioCallServer(
      this.config.dtmfGenerator,
      new IteratingTestAssigner(scenarios),
      testExecutor(this.config.transcriber)
    );

    const caller: Caller<TestSubject | Buffer> = Buffer.isBuffer(call)
      ? new AudioPlaybackCaller()
      : new TwilioCaller(this.config.twilioClient);

    const testRunnerManager = createTestRunnerManager();
    this.pluginManager.initialise(testRunnerManager.testRunner);

    const serverUrl = await callServer.listen(this.config.localServerPort);
    this.pluginManager.serverListening(callServer);

    const calls = Promise.all(
      scenarios.map(() =>
        caller
          .call(call, this.config.publicServerUrl || serverUrl)
          .then((callRequested) =>
            this.pluginManager.callRequested(callRequested, scenarios.length)
          )
          .catch((error) => {
            this.pluginManager.callRequestErrored(new Error(error));
            throw error;
          })
      )
    );

    return new Promise((resolve, reject) => {
      calls
        .then(() => {
          callServer.on("stopped", reject);
          callServer.on("error", reject);

          testRunnerManager.setOnStopCallback((failure) => {
            callServer.off("stopped", reject);
            callServer.off("error", reject);

            callServer
              .stop()
              .catch((err) => err && console.error(err))
              .finally(() => {
                if (failure) {
                  reject();
                } else {
                  resolve();
                }
              });
          });
        })
        .catch((error) => {
          callServer.off("stopped", reject);
          callServer.off("error", reject);

          callServer
            .stop()
            .catch((err) => err && console.error(err))
            .finally(() => reject(error));
        });
    });
  }

  private async preflightChecks(): Promise<void> {
    const checkResults = await this.config.transcriber.checkCanRun();
    if (checkResults.canRun === false) {
      throw new Error(
        `Error with the transcriber you've chosen:\n${checkResults.reason}`
      );
    }
  }
}
