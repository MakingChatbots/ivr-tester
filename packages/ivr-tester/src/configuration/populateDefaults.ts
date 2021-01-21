import * as getenv from "getenv";
import { UlawDtmfBufferGenerator } from "../call/dtmf/UlawDtmfBufferGenerator";
import { consoleLogger } from "../testing/reporting/consoleLogger";
import { Config } from "./Config";
import { Twilio } from "twilio";
import { TwilioCallServer } from "../testing/TwilioCallServer";
import { CloseServerWhenTestsComplete } from "../testing/CloseServerWhenTestsComplete";

const getPublicServerUrl = (config: Config) => {
  const publicServerUrl = getenv.string(
    "PUBLIC_SERVER_URL",
    config.publicServerUrl || ""
  );
  return publicServerUrl
    ? CallServer.convertToWebSocketUrl(publicServerUrl).toString()
    : undefined;
};

const createDefaultClient = () =>
  new Twilio(
    getenv.string("TWILIO_ACCOUNT_SID"),
    getenv.string("TWILIO_AUTH_TOKEN")
  );

// TODO Replace with avj or maybe https://www.npmjs.com/package/convict
export const populateDefaults = (config: Config): Config => ({
  dtmfGenerator: config.dtmfGenerator || new UlawDtmfBufferGenerator(),
  transcriber: config.transcriber,
  msPauseAtEndOfTranscript: config.msPauseAtEndOfTranscript || 5 * 2000,
  localServerPort: getenv.int("LOCAL_SERVER_PORT", config.localServerPort),
  publicServerUrl: getPublicServerUrl(config),
  recording: config.recording,
  twilioClient: config.twilioClient || createDefaultClient(),
});
