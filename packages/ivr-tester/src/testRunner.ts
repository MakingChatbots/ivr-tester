import { TwilioCallServer } from "./testing/TwilioCallServer";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
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
import { Scenario } from "./configuration/scenario/Scenario";
import { validateConfig } from "./configuration/validateConfig";
import { validateAndEnrichScenario } from "./configuration/scenario/validateAndEnrichScenario";
import { IvrNumber } from "./configuration/call/IvrNumber";
import {
  TestSubject,
  validateTestSubject,
} from "./configuration/call/validateTestSubject";

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
  return new PluginManager([
    new StopTestRunnerWhenTestsComplete(),
    consoleUserInterface(),
    callConnectedTimeout(config),
    mediaStreamRecorderPlugin(config),
    transcriptRecorderPlugin(config),
  ]);
}

export interface RunnableTester {
  run(testSubject: TestSubject, scenario: Scenario[] | Scenario): Promise<void>;
}

export class IvrTester implements RunnableTester {
  private readonly config: Config;
  private readonly pluginManager: PluginManager;
  private running = false;

  constructor(configuration: Config) {
    const result = validateConfig(configuration);
    if (result.error) {
      throw result.error;
    }
    if (!result.config) {
      throw new Error("Error loading configuration");
    }

    this.config = result.config;

    this.pluginManager = createPluginManager(this.config);
  }

  public async run(
    testSubject: TestSubject,
    scenario: Scenario[] | Scenario
  ): Promise<void> {
    if (this.running) {
      throw new Error(
        "Instance of IvrTester can only run a single suite of scenarios"
      );
    }
    this.running = true;

    const testSubjectValidationResult = validateTestSubject(testSubject);
    if (testSubjectValidationResult.error) {
      throw testSubjectValidationResult.error;
    }

    const validationResult = validateAndEnrichScenario(scenario);
    if (validationResult.error) {
      throw validationResult.error;
    }
    const scenarios = validationResult.scenarios;

    await this.preflightChecks();

    const callServer = new TwilioCallServer(
      this.config.dtmfGenerator,
      new IteratingTestAssigner(scenarios),
      testExecutor(this.config.transcriber)
    );

    const twilioClient = this.config.twilioClientFactory(
      this.config.twilioAuth
    );
    const caller: Caller<IvrNumber | Buffer> = Buffer.isBuffer(testSubject)
      ? new AudioPlaybackCaller()
      : new TwilioCaller(twilioClient);

    const testRunnerManager = createTestRunnerManager();
    this.pluginManager.initialise(testRunnerManager.testRunner);

    const serverUrl = await callServer.listen(this.config.localServerPort);
    this.pluginManager.serverListening(callServer);

    const calls = Promise.all(
      scenarios.map(() =>
        caller
          .call(testSubject, this.config.publicServerUrl || serverUrl)
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
