import { Config } from "ivr-tester";
import { readFileSync } from "fs";
import commander from "commander";
import { configConverter } from "./configuration/config/configConverter";

export function loadConfigOption(
  options: commander.OptionValues,
  fsReadFileSync: typeof readFileSync
): Config {
  const configPath = options.configPath;

  if (!configPath) {
    return configConverter({});
  } else {
    let content: Buffer;
    try {
      content = fsReadFileSync(configPath);
    } catch (error) {
      throw new Error(
        `Failed to read config file '${configPath}'. Reason: ${error.message}`
      );
    }

    let jsonContent: Record<string, unknown>;
    try {
      jsonContent = JSON.parse(content.toString("utf-8"));
    } catch (error) {
      throw new Error(
        `Config file '${configPath}' not valid JSON. Reason: ${error.message}`
      );
    }

    try {
      return configConverter(jsonContent);
    } catch (error) {
      throw new Error(
        `Invalid config '${configPath}. Reason: ${error.message}`
      );
    }
  }
}
