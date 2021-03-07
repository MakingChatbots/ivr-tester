import { TwilioCallServer } from "./testing/TwilioCallServer";
import { Config } from "./configuration/Config";
import { PluginManager } from "./plugins/PluginManager";
import { populateDefaults } from "./configuration/populateDefaults";
import { TwilioCaller } from "./call/TwilioCaller";
import { IteratingTestAssigner } from "./testing/IteratingTestAssigner";
import { mediaStreamRecorderPlugin } from "./call/recording/MediaStreamRecorder";
import { TestExecutor } from "./testing/TestExecutor";
import { AudioPlaybackCaller } from "./call/AudioPlaybackCaller";
import { Caller } from "./call/Caller";
import { consoleUserInterface } from "./testing/ui/consoleUserInterface";
import { CloseServerWhenTestsComplete } from "./testing/CloseServerWhenTestsComplete";
import { CallFlowTest } from "./testing/test/CallFlowTest";
import { callConnectedTimeout } from "./testing/callConnectedTimeout";
import { Call } from "./call/Call";
import { CallTranscriber } from "./call/transcription/CallTranscriber";

export interface TestSubject {
  from: string;
  to: string;
}

/**
 * @param config - Configuration used for setting up the tests
 */
export const testRunner = (config: Config) => async (
  call: TestSubject | Buffer,
  ivrTest: CallFlowTest[] | CallFlowTest
): Promise<void> => {
  config = populateDefaults(config);

  const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

  const userInterface = consoleUserInterface();
  const pluginManager = new PluginManager([
    new CloseServerWhenTestsComplete(),
    userInterface,
    callConnectedTimeout(config, userInterface),
    mediaStreamRecorderPlugin(config),
  ]);
  pluginManager.initialise();

  const checkResults = await config.transcriber.checkCanRun();
  if (checkResults.canRun === false) {
    throw new Error(
      `Error with the transcriber you've chosen:\n${checkResults.reason}`
    );
  }

  const testExecutor: TestExecutor = {
    startTest(test: CallFlowTest, call: Call) {
      const callTranscriber = new CallTranscriber(
        call,
        this.transcriberFactory.create()
      );

      test.test.startListening(callTranscriber, call);
      return test.test;
    },
  };

  const callServer = new TwilioCallServer(
    config.dtmfGenerator,
    new IteratingTestAssigner(tests),
    testExecutor
  );
  const serverUrl = await callServer.listen(config.localServerPort);
  pluginManager.serverListening(callServer);

  const caller: Caller<TestSubject | Buffer> = Buffer.isBuffer(call)
    ? new AudioPlaybackCaller()
    : new TwilioCaller(config.twilioClient);

  const calls = Promise.all(
    tests.map(() =>
      caller
        .call(call, config.publicServerUrl || serverUrl)
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
        callServer.on("stopped", resolve);
        callServer.on("error", reject);
      })
      .catch((error) => {
        callServer
          .stop()
          .catch((err) => err && console.error(err))
          .finally(() => reject(error));
      });
  });
};
