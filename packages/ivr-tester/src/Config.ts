import { ServerConfig } from "./server";
import { Twilio } from "twilio";
import * as getenv from "getenv";
import { UlawDtmfBufferGenerator } from "./dtmf/UlawDtmfBufferGenerator";
import { consoleLogger } from "./plugins/lifecycle/consoleLogger";
import { StopWhenAllTestsComplete } from "./plugins/lifecycle/StopWhenAllTestsComplete";
import { TestRunnerConfig } from "./testRunner";

export interface Config extends ServerConfig, TestRunnerConfig {}

// TODO Replace with avj or maybe https://www.npmjs.com/package/convict
export const populateDefaults = (config: Config): Config => {
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
