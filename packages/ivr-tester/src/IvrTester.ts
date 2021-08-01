import { CallServerEvents, TwilioCallServer } from "./TwilioCallServer";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { TwilioCaller } from "./call/TwilioCaller";
import { mediaStreamRecorderPlugin } from "./call/recording/MediaStreamRecorder";
import { AudioPlaybackCaller } from "./call/AudioPlaybackCaller";
import { Caller, RequestedCall } from "./call/Caller";
import { consoleUserInterface } from "./interactions/scenarioTest/testing/ui/consoleUserInterface";
import { StopTestRunnerWhenTestsComplete } from "./interactions/scenarioTest/testing/StopTestRunnerWhenTestsComplete";
import { CallFlowTestSession } from "./interactions/scenarioTest/testing/test/CallFlowTest";
import { callConnectedTimeout } from "./callConnectedTimeout";
import { Call } from "./call/Call";
import { transcriptRecorderPlugin } from "./call/recording/TranscriptRecorder";
import { Scenario } from "./configuration/scenario/Scenario";
import { validateConfig } from "./configuration/validateConfig";
import { IvrNumber } from "./configuration/call/IvrNumber";
import { Subject, validateSubject } from "./configuration/call/validateSubject";
import { CallTranscriber } from "./call/transcription/CallTranscriber";
import { Emitter, TypedEmitter } from "./Emitter";
import { IvrTesterPlugin } from "./plugins/IvrTesterPlugin";

export interface TestSession {
  readonly scenario: Scenario;
  readonly call: Call;
  readonly callFlowTestSession: CallFlowTestSession;
}

function createPluginManager(
  config: Config,
  interaction: IvrCallFlowInteraction
): PluginManager {
  return new PluginManager([
    new StopTestRunnerWhenTestsComplete(),
    consoleUserInterface(),
    callConnectedTimeout(config),
    mediaStreamRecorderPlugin(config),
    transcriptRecorderPlugin(config),
    ...interaction.getPlugins(),
  ]);
}

export interface RunnableTester {
  run(subject: Subject): Promise<void>;
}

export interface IvrCallFlowInteraction {
  callConnected(call: Call, callTranscriber: CallTranscriber): void;
  getNumberOfCallsToMake(): number;

  /**
   * Called when IVR Tester is starting to allow the interactions to provide plugins
   * that are called with lifecycle events.
   */
  getPlugins(): IvrTesterPlugin[];
}

export interface CallRequestedEvent {
  requestedCall: RequestedCall;
  total: number;
}

export interface CallRequestErroredEvent {
  error: Error;
}

export interface CallServerStartedEvent {
  callServer: Emitter<CallServerEvents>;
}

export interface IvrTesterAborted {
  dueToFailure: boolean;
  reason: string;
}

export type IvrTesterLifecycleEvents = {
  callServerStarted: CallServerStartedEvent;
  callRequested: CallRequestedEvent;
  callRequestErrored: CallRequestErroredEvent;
  ivrTesterAborted: IvrTesterAborted;
  // testsAborting: TestsAbortingEvent;
};

/**
 * Interface exposed to plugins to allow them to listen to events and abort testing.
 */
export type ReadonlyIvrTesterLifecycle = Omit<
  Emitter<IvrTesterLifecycleEvents>,
  "emit"
>;

/**
 * Despite the name this manages the interaction with an IVR call flow
 * e.g. making a call, sets up transcriber, cleanup, Twilio costs reporting etc
 *
 * It is up to the implementor of the {@link IvrCallFlowInteraction} to manage how it will
 * interact with the call
 */
export class IvrTester implements RunnableTester {
  private readonly config: Config;
  private readonly pluginManager: PluginManager;
  private running = false;

  /**
   * Used to emit lifecycle events of IVR Tester
   */
  private readonly ivrTesterLifecycle: Emitter<IvrTesterLifecycleEvents>;

  constructor(
    readonly configuration: Config,
    private readonly ivrCallFlowInteraction: IvrCallFlowInteraction
  ) {
    const result = validateConfig(configuration);
    if (result.error) {
      throw result.error;
    }
    if (!result.config) {
      throw new Error("Error loading configuration");
    }

    this.config = result.config;
    this.ivrTesterLifecycle = new TypedEmitter<IvrTesterLifecycleEvents>();

    this.pluginManager = createPluginManager(this.config);
  }

  public getLifecycleEventEmitter(): ReadonlyIvrTesterLifecycle {
    return this.ivrTesterLifecycle;
  }

  public async run(subject: Subject): Promise<void> {
    if (this.running) {
      throw new Error(
        "Instance of IvrTester can only run against a single subject at a time"
      );
    }
    this.running = true;

    const subjectValidationResult = validateSubject(subject);
    if (subjectValidationResult.error) {
      throw subjectValidationResult.error;
    }

    await this.preflightChecks();

    const callServer = new TwilioCallServer(
      this.config.dtmfGenerator,
      this.ivrCallFlowInteraction,
      this.config.transcriber
    );

    const twilioClient = this.config.twilioClientFactory(
      this.config.twilioAuth
    );
    const caller: Caller<IvrNumber | Buffer> = Buffer.isBuffer(subject)
      ? new AudioPlaybackCaller()
      : new TwilioCaller(twilioClient);

    const serverUrl = await callServer.listen(this.config.localServerPort);
    this.ivrTesterLifecycle.emit("callServerStarted", { callServer });
    // this.pluginManager.serverListening(callServer);

    const totalCallsToMake = this.ivrCallFlowInteraction.getNumberOfCallsToMake();
    const calls = Promise.all(
      Array(totalCallsToMake).map(() =>
        caller
          .call(subject, this.config.publicServerUrl || serverUrl)
          .then((callRequested) => {
            this.ivrTesterLifecycle.emit("callRequested", {
              requestedCall: callRequested,
              total: totalCallsToMake,
            });
            // this.pluginManager.callRequested(callRequested, totalCallsToMake)
          })
          .catch((error) => {
            this.pluginManager.callRequestErrored(new Error(error));
            throw error;
          })
      )
    );

    return new Promise((resolve, reject) => {
      callServer.on("stopped", reject);
      callServer.on("error", reject);

      calls
        .then(() => {
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
