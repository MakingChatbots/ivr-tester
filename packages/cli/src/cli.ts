import { accessSync, readFileSync } from "node:fs";
import { Command } from "commander";
import {
  type Config,
  type IvrNumber,
  IvrTester,
  type RunnableTester,
  type Scenario,
} from "ivr-tester";
import ngrok from "ngrok";
import { createProgram, type Program } from "./createProgram";
import { createJsonFileReader } from "./fileSystem/jsonFileReader";
import { readableFileValidator } from "./fileSystem/readableFileValidator";
import { loadConfigOption } from "./options/config/loadConfigOption";
import { loadScenarioOption } from "./options/scenario/loadScenarioOption";

export type IvrTesterFactory = (config: Config) => RunnableTester;

interface Dependencies {
  ivrTesterFactory?: IvrTesterFactory;
  ngrokServer?: typeof ngrok;
  outputConsole?: Console;
  program?: Program;
  fsReadFileSync?: typeof readFileSync;
  fsAccessSync?: typeof accessSync;
  requireModule?: NodeJS.Require;
}

export type Cli = (args: string[]) => Promise<void>;

export function createCli({
  ivrTesterFactory = (config: Config) => new IvrTester(config),
  ngrokServer = ngrok,
  outputConsole = console,
  program = createProgram(new Command(), false),
  fsReadFileSync = readFileSync,
  fsAccessSync = accessSync,
  requireModule = require,
}: Dependencies = {}): Cli {
  program.command.requiredOption(
    "-f, --from <phoneNumber>",
    "Phone number calling from e.g. +441234567890",
  );
  program.command.requiredOption(
    "-t, --to <phoneNumber>",
    "Phone number to be called e.g. +441234567890",
  );
  program.command.requiredOption<string>(
    "-c, --config-path <filePath>",
    "path of the config file",
    readableFileValidator(fsAccessSync),
  );
  program.command.requiredOption<string>(
    "-s, --scenario-path <filePath>",
    "path of the scenario file",
    readableFileValidator(fsAccessSync),
  );

  const jsonFileReader = createJsonFileReader(fsReadFileSync);

  return async (args: string[]): Promise<void> => {
    program.command.parse(args);

    const options = program.command.opts();

    let scenario: Scenario;
    try {
      scenario = loadScenarioOption(options, jsonFileReader);
    } catch (error) {
      program.exit(error.message);
    }

    let config: Config;
    try {
      config = loadConfigOption(options, jsonFileReader, requireModule);
    } catch (error) {
      program.exit(error.message);
    }

    const call: IvrNumber = {
      from: options.from,
      to: options.to,
    };

    const url = await ngrokServer.connect(config.localServerPort);
    await ivrTesterFactory({ ...config, publicServerUrl: url }).run(
      call,
      scenario,
    );
  };
}
