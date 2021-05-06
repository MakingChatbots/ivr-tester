import { Config } from "ivr-tester";
import commander from "commander";
import { configConverter } from "./json/configConverter";
import { JsonFileReader } from "../../fileSystem/jsonFileReader";

export function loadConfigOption(
  options: commander.OptionValues,
  jsonFileReader: JsonFileReader
): Config {
  const configPath = options.configPath;

  if (!configPath) {
    return configConverter({});
  }

  const jsonContent = jsonFileReader(configPath);

  try {
    return configConverter(jsonContent);
  } catch (error) {
    throw new Error(`Invalid config '${configPath}. Reason: ${error.message}`);
  }
}
