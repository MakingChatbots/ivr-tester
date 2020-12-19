import { CallServer, CallServerEventProbe } from "./testing/CallServer";
import { IvrTest, TestSubject } from "./handlers/TestHandler";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { populateDefaults } from "./configuration/populateDefaults";
import { IvrCaller } from "./call/IvrCaller";
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

const probeAdaptor = (
  emitter: LifecycleEventEmitter
): TestExecutorEventProbe & TestAssignerEventProbe & CallServerEventProbe => ({
  callAssignedTest: (event) => emitter.emit("callAssignedTest", event),
  callConnected: () => emitter.emit("callConnected", undefined),
  ivrTestConditionMet: (event) => emitter.emit("ivrTestConditionMet", event),
  ivrTestFailed: (event) => emitter.emit("ivrTestFailed", event),
  ivrTestPassed: (event) => emitter.emit("ivrTestPassed", event),
  callHungUpAsNoTestAssigned: (reason) =>
    console.warn(`Hung-up call as no test was assigned. Reason: ${reason}`),
});

// interface TestRunner {
//   abortAllTests(): void;
// }

export const testRunner = (config: Config) => async (
  call: TestSubject,
  ivrTest: IvrTest[] | IvrTest
): Promise<void> => {
  config = populateDefaults(config);

  const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

  const pluginManager = new PluginManager();
  pluginManager.loadPlugins(config.plugins);

  const emitter = pluginManager.getEmitter();
  const probe = probeAdaptor(emitter);

  const testExecutor = new DefaultTestExecutor(
    config.transcriber,
    config.pauseAtEndOfTranscript,
    probe
  );

  // TODO Tidy this
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
  emitter.emit("callHandlingServerStarted", { server: server.wss });

  const ivrCaller = new IvrCaller(config.twilioClient);

  const makeCalls = tests.map((test, index) => {
    emitter.emit("callRequested", {
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
          emitter.emit("callHandlingServerStopped", undefined);
          resolve();
        });
        server.wss.on("error", (error) => {
          emitter.emit("callHandlingServerErrored", { error });
          reject(error);
        });
      })
      .catch((error) => {
        emitter.emit("callRequestErrored", { error });
        server.wss.close((err) => err && console.error(err));
        reject(error);
      });
  });
};
