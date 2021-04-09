import commander, { Command } from "commander";
import * as fs from "fs";
import { accessSync, readFileSync } from "fs";
import { scenarioConverter } from "./configuration/scenarioConverter";
import {
  Config,
  IvrNumber,
  IvrTester,
  RunnableTester,
  Scenario,
} from "ivr-tester";
import ngrok from "ngrok";
import { defaultConfig } from "./configuration/defaultConfig";

export type IvrTesterFactory = (config: Config) => RunnableTester;

interface Dependencies {
  ivrTesterFactory?: IvrTesterFactory;
  ngrokServer?: typeof ngrok;
  outputConsole?: Console;
  program?: commander.Command;
  fsReadFileSync?: typeof readFileSync;
  fsAccessSync?: typeof accessSync;
}

export type App = (args: string[]) => Promise<void>;

function fileReadable(fsAccessSync: typeof accessSync) {
  return function (filePath: string): string {
    try {
      fsAccessSync(filePath, fs.constants.R_OK);
    } catch (error) {
      throw new commander.InvalidOptionArgumentError(
        `Schema file '${filePath}' is not readable`
      );
    }
    return filePath;
  };
}

export function createApp({
  ivrTesterFactory = (config: Config) => new IvrTester(config),
  ngrokServer = ngrok,
  outputConsole = console,
  program = new Command(),
  fsReadFileSync = readFileSync,
  fsAccessSync = accessSync,
}: Dependencies = {}): App {
  program.requiredOption(
    "-f, --from <phoneNumber>",
    "Phone number calling from e.g. +441234567890"
  );
  program.requiredOption(
    "-t, --to <phoneNumber>",
    "Phone number to be called e.g. +441234567890"
  );
  program.requiredOption<string>(
    "-s, --scenario-path <filePath>",
    "path of the scenario file",
    fileReadable(fsAccessSync)
  );

  return async function (args: string[]): Promise<void> {
    program.parse(args);

    const options = program.opts();
    outputConsole.log(options);

    let content: Buffer;
    try {
      content = fsReadFileSync(options.scenarioPath);
    } catch (error) {
      throw new Error(
        `Failed to read schema file '${options.scenarioPath}'. Reason: ${error.message}`
      );
    }

    let jsonContent: Record<string, unknown>;
    try {
      jsonContent = JSON.parse(content.toString("utf-8"));
    } catch (error) {
      throw new Error(
        `Schema file '${options.scenarioPath}' not valid JSON. Reason: ${error.message}`
      );
    }

    let scenario: Scenario;
    try {
      scenario = scenarioConverter(jsonContent as any);
    } catch (error) {
      throw new Error(
        `Invalid schema '${options.scenarioPath}. Reason: ${error.message}`
      );
    }
    // CommanderError Don't know if it's better to throw this instead of Error
    const call: IvrNumber = {
      from: options.from,
      to: options.to,
    };

    const url = await ngrokServer.connect(defaultConfig.localServerPort);
    await ivrTesterFactory({ ...defaultConfig, publicServerUrl: url }).run(
      call,
      scenario
    );
  };
}
