import { Twilio, twiml } from "twilio";
import {
  CallHandlingServer,
  formatServerUrl,
  startServerListening,
} from "./server";
import { IvrTest, TestSubject } from "./handlers/TestHandler";
import { Config, populateDefaults } from "./Config";
import { callParameterSerializer } from "./twilio";
import { URL } from "url";
import { IvrTesterPlugin } from "./plugins/IvrTesterPlugin";
import {createLifecycleEventEmitter} from "./plugins/events/LifecycleEventEmitter";

export interface TestRunnerConfig {
  /**
   * Twilio client used to initiate the call to the IVR
   */
  twilioClient?: Twilio;

  /**
   * URL of the server that is publicly accessible. This is the
   * server that Twilio connects to when creating the bi-directional
   * stream of the call
   * This value can be overridden by setting the environment variable PUBLIC_SERVER_URL
   */
  publicServerUrl?: string | undefined;

  plugins?: IvrTesterPlugin[];
}

const createPublicStreamUrl = (
  config: Config,
  server: CallHandlingServer
): URL => {
  const serverUrl = config.publicServerUrl || formatServerUrl(server);

  const streamUrl = new URL(serverUrl.toString());
  streamUrl.pathname = "/";
  streamUrl.protocol = "wss";

  return streamUrl;
};

const makeCall = (config: Config, call: TestSubject, streamUrl: URL) => {
  const response = new twiml.VoiceResponse();
  const connect = response.connect();
  const stream = connect.stream({ url: streamUrl.toString() });

  callParameterSerializer.addParameters(stream, call);

  return config.twilioClient.calls.create({
    twiml: response.toString(),
    ...call,
  });
};

// eslint-disable-next-line no-unused-vars
interface TestRunner {
  abortAllTests(): void;
}

export const testRunner = (config: Config) => async (
  call: TestSubject,
  ivrTest: IvrTest[] | IvrTest
): Promise<void> => {
  config = populateDefaults(config);

  const tests = Array.isArray(ivrTest) ? ivrTest : [ivrTest];

  const emitter = createLifecycleEventEmitter();
  config.plugins.forEach((plugin) => plugin.initialise(emitter));

  const server = await startServerListening(config, tests, emitter);
  emitter.emit("callHandlingServerStarted", { server: server.wss });

  const callPromises = tests.map((test, index) => {
    emitter.emit("callRequested", {
      call,
      total: tests.length,
      current: index + 1,
    });
    return makeCall(config, call, createPublicStreamUrl(config, server));
  });

  return new Promise((resolve, reject) => {
    Promise.all(callPromises)
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
