import { Scenario } from "ivr-tester";
import { scenarioConverter } from "./json/scenarioConverter";
import commander from "commander";
import { JsonFileReader } from "../../fileSystem/jsonFileReader";

export function loadScenarioOption(
  options: commander.OptionValues,
  jsonFileReader: JsonFileReader
): Scenario {
  const jsonContent = jsonFileReader(options.scenarioPath);

  try {
    return scenarioConverter(jsonContent);
  } catch (error) {
    throw new Error(
      `Invalid Scenario '${options.scenarioPath}. Reason: ${error.message}`
    );
  }
}
