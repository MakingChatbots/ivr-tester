import commander, { Command } from "commander";
import * as fs from "fs";
import { accessSync, readFileSync } from "fs";
import {
  Config,
  IvrNumber,
  IvrTester,
  RunnableTester,
  Scenario,
} from "ivr-tester";
import ngrok from "ngrok";
import { createProgram, Program } from "./createProgram";
import { loadScenarioOption } from "./loadScenarioOption";
import { loadConfigOption } from "./loadConfigOption";

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

export function fileReadable(fsAccessSync: typeof accessSync) {
  return function (filePath: string): string {
    try {
      fsAccessSync(filePath, fs.constants.R_OK);
    } catch (error) {
      throw new commander.InvalidOptionArgumentError(
        `File '${filePath}' is not readable`
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
  program.command.option<string>(
    "-c, --config-path <filePath>",
    "path of the config file",
    fileReadable(fsAccessSync)
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

    let scenario: Scenario;
    try {
      scenario = loadScenarioOption(options, fsReadFileSync);
    } catch (error) {
      program.exit(error.message);
    }

    let config: Config;
    try {
      config = loadConfigOption(options, fsReadFileSync);
    } catch (error) {
      program.exit(error.message);
    }

    const call: IvrNumber = {
      from: options.from,
      to: options.to,
    };

    const url = await ngrokServer.connect(config.localServerPort);
    try {
      await ivrTesterFactory({ ...config, publicServerUrl: url }).run(
        call,
        scenario
      );
    } catch (error) {
      throw error;
    }
  };
}
