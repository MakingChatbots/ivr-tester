import { Twilio, twiml } from "twilio";
import * as getenv from "getenv";
import {
  CallHandlingServer,
  formatServerUrl,
  startServerListening,
} from "./server";
import { IvrTest, TestSubject } from "./handlers/TestHandler";
import { Config } from "./Config";
import { UlawDtmfBufferGenerator } from "./dtmf/UlawDtmfBufferGenerator";
import { callParameterSerializer } from "./twilio";
import { createLifecycleEventEmitter } from "./plugins/events/eventEmitter";
import { consoleLogger } from "./plugins/consoleLogger";
import { StopWhenAllTestsComplete } from "./plugins/StopWhenAllTestsComplete";
import { URL } from "url";

// TODO Replace with avj or maybe https://www.npmjs.com/package/convict
const populateDefaults = (config: Config): Config => {
  const createDefaultClient = () =>
    new Twilio(
      getenv.string("TWILIO_ACCOUNT_SID"),
      getenv.string("TWILIO_AUTH_TOKEN")
    );

  return {
    dtmfGenerator: config.dtmfGenerator || new UlawDtmfBufferGenerator(),
    transcriber: config.transcriber,
    localServerPort: getenv.int("LOCAL_SERVER_PORT", config.localServerPort),
    plugins: config.plugins || [consoleLogger, new StopWhenAllTestsComplete()],
    publicServerUrl:
      getenv.string("PUBLIC_SERVER_URL", config.publicServerUrl || "") ||
      undefined,
    recording: config.recording,
    twilioClient: config.twilioClient || createDefaultClient(),
  };
};

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
