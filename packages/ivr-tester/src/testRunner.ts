import { CallServer, CallServerEventProbe } from "./testing/CallServer";
import { IvrTest, TestSubject } from "./handlers/TestHandler";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { populateDefaults } from "./configuration/populateDefaults";
import { TwilioCaller } from "./call/TwilioCaller";
import {
  IteratingTestAssigner,
  TestAssignerEventProbe,
} from "./testing/IteratingTestAssigner";
import { MediaStreamRecorder } from "./call/recording/MediaStreamRecorder";
import {
  DefaultTestExecutor,
  TestExecutorEventProbe,
} from "./testing/DefaultTestExecutor";
import { LifecycleEventEmitter } from "./plugins/lifecycle/LifecycleEventEmitter";
import { AudioPlaybackCaller } from "./call/AudioPlaybackCaller";
import { Caller } from "./call/Caller";

const probeAdaptor = (
  emitter: LifecycleEventEmitter
): TestExecutorEventProbe & TestAssignerEventProbe & CallServerEventProbe => ({
  ivrTranscription: (event) => emitter.emit("ivrTranscription", event),
  callAssignedTest: (event) => emitter.emit("callAssignedTest", event),
  callConnected: () => emitter.emit("callConnected", undefined),
  ivrTestConditionMet: (event) => emitter.emit("ivrTestConditionMet", event),
  ivrTestFailed: (event) => emitter.emit("ivrTestFailed", event),
  ivrTestPassed: (event) => emitter.emit("ivrTestPassed", event),
  callHungUpAsNoTestAssigned: (reason) =>
    console.warn(`Hung-up call as no test was assigned. Reason: ${reason}`),
});

/**
 * @param config - Configuration used for setting up the tests
 */
export const testRunner = (config: Config) => async (
  call: TestSubject | Buffer,
  ivrTest: IvrTest[] | IvrTest
): Promise<void> => {
  config = populateDefaults(config);

  const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

  const pluginManager = new PluginManager();
  pluginManager.loadPlugins(config.plugins);

  const pluginEmitter = pluginManager.getEmitter();
  const probe = probeAdaptor(pluginEmitter);

  const testExecutor = new DefaultTestExecutor(
    config.transcriber,
    config.msPauseAtEndOfTranscript,
    probe
  );

  if (config.recording) {
    testExecutor.addHandler((c, t) =>
      MediaStreamRecorder.createFromConfiguration(config, c.getStream(), t)
    );
  }

  const callServer = new CallServer(
    config.dtmfGenerator,
    new IteratingTestAssigner(tests, probe),
    testExecutor,
    probe
  );
  const server = await callServer.listen(config.localServerPort);
  pluginEmitter.emit("callHandlingServerStarted", { server: server.wss });

  const ivrCaller: Caller<Buffer | TestSubject> = Buffer.isBuffer(call)
    ? new AudioPlaybackCaller()
    : new TwilioCaller(config.twilioClient);

  const makeCalls = tests.map((test, index) => {
    pluginEmitter.emit("callRequested", {
      call,
      total: tests.length,
      current: index + 1,
    });

    return ivrCaller.call(call, config.publicServerUrl || server.local);
  });

  return new Promise((resolve, reject) => {
    Promise.all(makeCalls)
      .then(() => {
        server.wss.on("close", () => {
          pluginEmitter.emit("callHandlingServerStopped", undefined);
          resolve();
        });
        server.wss.on("error", (error) => {
          pluginEmitter.emit("callHandlingServerErrored", { error });
          reject(error);
        });
      })
      .catch((error) => {
        pluginEmitter.emit("callRequestErrored", { error });
        server.wss.close((err) => err && console.error(err));
        reject(error);
      });
  });
};
