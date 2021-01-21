import { TwilioCallServer } from "./testing/TwilioCallServer";
import { IvrTest, TestSubject } from "./handlers/TestInstanceClass";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { populateDefaults } from "./configuration/populateDefaults";
import { TwilioCaller } from "./call/TwilioCaller";
import { IteratingTestAssigner } from "./testing/IteratingTestAssigner";
import { MediaStreamRecorder } from "./call/recording/MediaStreamRecorder";
import { DefaultTestExecutor } from "./testing/DefaultTestExecutor";
import { AudioPlaybackCaller } from "./call/AudioPlaybackCaller";
import { Caller } from "./call/Caller";
import { consoleLogger } from "./testing/reporting/consoleLogger";
import { CloseServerWhenTestsComplete } from "./testing/CloseServerWhenTestsComplete";

/**
 * @param config - Configuration used for setting up the tests
 */
export const testRunner = (config: Config) => async (
  call: TestSubject | Buffer,
  ivrTest: IvrTest[] | IvrTest
): Promise<void> => {
  config = populateDefaults(config);

  const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

  const pluginManager = new PluginManager([
    consoleLogger,
    new CloseServerWhenTestsComplete(),
  ]);
  pluginManager.initialise();

  const testExecutor = new DefaultTestExecutor(
    config.transcriber,
    config.msPauseAtEndOfTranscript
  );

  const callServer = new TwilioCallServer(
    config.dtmfGenerator,
    new IteratingTestAssigner(tests),
    testExecutor
  );
  const server = await callServer.listen(config.localServerPort);
  pluginManager.serverListening(callServer);

  if (config.recording) {
    callServer.on("testStarted", ({ testInstance }) => {
      MediaStreamRecorder.createFromConfiguration(config, testInstance);
    });
  }

  const caller: Caller<TestSubject | Buffer> = Buffer.isBuffer(call)
    ? new AudioPlaybackCaller()
    : new TwilioCaller(config.twilioClient);

  const calls = Promise.all(
    tests.map(() =>
      caller
        .call(call, config.publicServerUrl || server.local)
        .then((callRequested) =>
          pluginManager.callRequested(callRequested, tests.length)
        )
        .catch((error) => {
          pluginManager.callRequestErrored(new Error(error));
          throw error;
        })
    )
  );

  return new Promise((resolve, reject) => {
    calls
      .then(() => {
        server.wss.on("close", resolve);
        server.wss.on("error", reject);
      })
      .catch((error) => {
        server.wss.close((err) => err && console.error(err));
        reject(error);
      });
  });
};
