import type commander from "commander";
import type { Scenario } from "ivr-tester";
import type { JsonFileReader } from "../../fileSystem/jsonFileReader";
import { scenarioConverter } from "./json/scenarioConverter";

export function loadScenarioOption(
  options: commander.OptionValues,
  jsonFileReader: JsonFileReader,
): Scenario {
  const jsonContent = jsonFileReader(options.scenarioPath);

  try {
    return scenarioConverter(jsonContent);
  } catch (error) {
    throw new Error(
      `Invalid Scenario '${options.scenarioPath}. Reason: ${error.message}`,
    );
  }
}
