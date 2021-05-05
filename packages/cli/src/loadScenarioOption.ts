import { Scenario } from "ivr-tester";
import { scenarioConverter } from "./configuration/scenario/scenarioConverter";
import { readFileSync } from "fs";
import commander from "commander";

export function loadScenarioOption(
  options: commander.OptionValues,
  fsReadFileSync: typeof readFileSync
): Scenario {
  const scenarioPath = options.scenarioPath;

  let content: Buffer;
  try {
    content = fsReadFileSync(scenarioPath);
  } catch (error) {
    throw new Error(
      `Failed to read scenario file '${scenarioPath}'. Reason: ${error.message}`
    );
  }

  let jsonContent: Record<string, unknown>;
  try {
    jsonContent = JSON.parse(content.toString("utf-8"));
  } catch (error) {
    throw new Error(
      `Scenario file '${scenarioPath}' not valid JSON. Reason: ${error.message}`
    );
  }

  try {
    return scenarioConverter(jsonContent);
  } catch (error) {
    throw new Error(
      `Invalid Scenario '${scenarioPath}. Reason: ${error.message}`
    );
  }
}
