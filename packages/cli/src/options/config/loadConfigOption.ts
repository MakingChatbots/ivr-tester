import { Config, TranscriberFactory } from "ivr-tester";
import commander from "commander";
import { JsonFileReader } from "../../fileSystem/jsonFileReader";
import { JsonConfigTranscriber } from "./json/JsonConfig";
import { validateConfig } from "./json/validateJsonConfig";

const MODULE_PREFIX = "ivr-tester-transcriber-";

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
    const { error, config } = validateConfig(configuration);
    if (error) {
      throw new Error(error.message);
    }

    return {
      transcriber: loadTranscriber(config.transcriber),
      localServerPort: config.localServerPort,
      recording: config.recording,
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
