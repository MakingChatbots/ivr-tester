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
import { CloseServerWhenTestsComplete } from "./testing/CloseServerWhenTestsComplete";
import {
  CallFlowSession,
  CallFlowTestDefinition,
} from "./testing/test/CallFlowTestDefinition";
import { callConnectedTimeout } from "./testing/callConnectedTimeout";
import { Call } from "./call/Call";
import { transcriptRecorderPlugin } from "./call/recording/TranscriptRecorder";

export interface TestSubject {
  from: string;
  to: string;
}

export interface TestSession {
  readonly callFlowTestDefinition: CallFlowTestDefinition;
  readonly call: Call;
  readonly callFlowSession: CallFlowSession;
}

export interface Runner {
  /**
   * Stops the test runner
   * @param failure - Whether the running being stopped was due to a failure
   *                e.g. some component failed to start, or a test failed
   */
  stop(failure?: boolean): void;
}

function createPluginManager(config: Config): PluginManager {
  const userInterface = consoleUserInterface();

  return new PluginManager([
    new CloseServerWhenTestsComplete(),
    userInterface,
    callConnectedTimeout(config, userInterface),
    mediaStreamRecorderPlugin(config),
    transcriptRecorderPlugin(config),
  ]);
}

// TODO Tidy this by integrating into IvrTester
function createStoppableRunner(): {
  setCallback: (cb: (failure: boolean) => void) => void;
  runner: Runner;
} {
  let callback: (failure: boolean) => void = undefined;
  let stopped = false;
  let stoppedDueToFailure = false;

  return {
    setCallback(cb: (failure: boolean) => void) {
      callback = cb;
      if (stopped) {
        callback(stoppedDueToFailure);
      }
    },
    runner: {
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
    ivrTest: CallFlowTestDefinition[] | CallFlowTestDefinition
  ): Promise<void> {
    if (this.running) {
      throw new Error("Instance of IvrTester can only run a single test suite");
    }
    this.running = true;

    const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

    await this.preflightChecks();

    const callServer = new TwilioCallServer(
      this.config.dtmfGenerator,
      new IteratingTestAssigner(tests),
      testExecutor(this.config.transcriber)
    );

    const caller: Caller<TestSubject | Buffer> = Buffer.isBuffer(call)
      ? new AudioPlaybackCaller()
      : new TwilioCaller(this.config.twilioClient);

    const stoppableRunner = createStoppableRunner();
    this.pluginManager.initialise(stoppableRunner.runner);

    const serverUrl = await callServer.listen(this.config.localServerPort);
    this.pluginManager.serverListening(callServer);

    const calls = Promise.all(
      tests.map(() =>
        caller
          .call(call, this.config.publicServerUrl || serverUrl)
          .then((callRequested) =>
            this.pluginManager.callRequested(callRequested, tests.length)
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

          stoppableRunner.setCallback((failure) => {
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
