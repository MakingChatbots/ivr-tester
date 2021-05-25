import { Config, TranscriberFactory } from "ivr-tester";
import commander from "commander";
import { JsonFileReader } from "../../fileSystem/jsonFileReader";
import { JsonConfigTranscriber } from "./json/JsonConfig";
import { validateConfig } from "./json/validateJsonConfig";
import { TwilioClientAuth } from "ivr-tester/dist/call/twilio";

const MODULE_PREFIX = "ivr-tester-transcriber-";

function validateTwilioClientAuth(
  env: NodeJS.ProcessEnv
): { error: Error; value: TwilioClientAuth } {
  const accountSid = env.TWILIO_ACCOUNT_SID;
  const authToken = env.TWILIO_AUTH_TOKEN;

  let error;
  if (!accountSid && authToken) {
    error = new Error("TWILIO_ACCOUNT_SID environment variable must be set");
  }
  if (accountSid && !authToken) {
    error = new Error("TWILIO_AUTH_TOKEN environment variable must be set");
  }
  if (!accountSid && !authToken) {
    error = new Error(
      "TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables must be set"
    );
  }

  return {
    error,
    value: error
      ? undefined
      : {
          accountSid,
          authToken,
        },
  };
}

export function loadConfigOption(
  options: commander.OptionValues,
  jsonFileReader: JsonFileReader,
  moduleRequire: NodeJS.Require
): Config {
  function loadTranscriber(
    transcriber: JsonConfigTranscriber
  ): TranscriberFactory {
    const transcriberModuleName = `${MODULE_PREFIX}${transcriber.name}`;

    let factory: ReturnType<NodeJS.Require>;
    try {
      factory = moduleRequire(transcriberModuleName);
    } catch (error) {
      if (error.code === "MODULE_NOT_FOUND") {
        throw new Error(
          `Cannot find module '${error.moduleName}' for the transcriber '${transcriber.name}'`
        );
      }
      throw error;
    }

    if (typeof factory.default !== "function") {
      throw new Error(
        `Transcriber loaded does not have a default export '${transcriberModuleName}'. Contact the author of this package`
      );
    }

    return factory.default(transcriber.options);
  }

  function convert(configuration: unknown): Config {
    const configResult = validateConfig(configuration);
    if (configResult.error) {
      throw new Error(configResult.error.message);
    }

    const authResult = validateTwilioClientAuth(process.env);
    if (authResult.error) {
      throw new Error(authResult.error.message);
    }

    return {
      transcriber: loadTranscriber(configResult.config.transcriber),
      localServerPort: configResult.config.localServerPort,
      recording: configResult.config.recording,
      twilioAuth: authResult.value,
    };
  }

  const configPath = options.configPath;
  const jsonContent = jsonFileReader(configPath);

  try {
    return convert(jsonContent);
  } catch (error) {
    throw new Error(`Invalid config '${configPath}. Reason: ${error.message}`);
  }
}
