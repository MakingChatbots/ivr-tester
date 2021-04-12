import commander, { Command } from "commander";
import * as fs from "fs";
import { accessSync, readFileSync } from "fs";
import { scenarioConverter } from "./configuration/scenario/scenarioConverter";
import {
  Config,
  IvrNumber,
  IvrTester,
  RunnableTester,
  Scenario,
} from "ivr-tester";
import ngrok from "ngrok";
import { defaultConfig } from "./configuration/defaultConfig";
import { createProgram, Program } from "./createProgram";

export type IvrTesterFactory = (config: Config) => RunnableTester;

interface Dependencies {
  ivrTesterFactory?: IvrTesterFactory;
  ngrokServer?: typeof ngrok;
  outputConsole?: Console;
  program?: Program;
  fsReadFileSync?: typeof readFileSync;
  fsAccessSync?: typeof accessSync;
}

export type Cli = (args: string[]) => Promise<void>;

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

export function createCli({
  ivrTesterFactory = (config: Config) => new IvrTester(config),
  ngrokServer = ngrok,
  outputConsole = console,
  program = createProgram(new Command(), false),
  fsReadFileSync = readFileSync,
  fsAccessSync = accessSync,
}: Dependencies = {}): Cli {
  program.command.requiredOption(
    "-f, --from <phoneNumber>",
    "Phone number calling from e.g. +441234567890"
  );
  program.command.requiredOption(
    "-t, --to <phoneNumber>",
    "Phone number to be called e.g. +441234567890"
  );
  program.command.requiredOption<string>(
    "-s, --scenario-path <filePath>",
    "path of the scenario file",
    fileReadable(fsAccessSync)
  );

  return async function (args: string[]): Promise<void> {
    program.command.parse(args);

    const options = program.command.opts();
    outputConsole.log(options);

    let content: Buffer;
    try {
      content = fsReadFileSync(options.scenarioPath);
    } catch (error) {
      program.exit(
        `Failed to read schema file '${options.scenarioPath}'. Reason: ${error.message}`
      );
    }

    let jsonContent: Record<string, unknown>;
    try {
      jsonContent = JSON.parse(content.toString("utf-8"));
    } catch (error) {
      program.exit(
        `Schema file '${options.scenarioPath}' not valid JSON. Reason: ${error.message}`
      );
    }

    let scenario: Scenario;
    try {
      scenario = scenarioConverter(jsonContent);
    } catch (error) {
      program.exit(
        `Invalid schema '${options.scenarioPath}. Reason: ${error.message}`
      );
    }

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
