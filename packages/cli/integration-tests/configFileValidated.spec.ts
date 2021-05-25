import { Cli, createCli } from "../src/cli";
import * as fs from "fs";
import { accessSync, readFileSync } from "fs";
import { Command } from "commander";
import { createProgram } from "../src/createProgram";
import { JsonScenario } from "../src/options/scenario/json/jsonScenario";
import { when } from "jest-when";
import { JsonConfig } from "../src/options/config/json/JsonConfig";

describe("Config file validated", () => {
  const validScenarioFilePath = "/test/path/scenario.json";
  const validScenario: Readonly<JsonScenario> = {
    name: "test-scenario",
    steps: [],
  };

  let capturedOutput: {
    stdOut: string[];
    errOut: string[];
  };

  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;
  let fsAccessSync: jest.MockedFunction<typeof accessSync>;
  let cli: Cli;

  beforeEach(() => {
    process.env.TWILIO_ACCOUNT_SID = "test-1";
    process.env.TWILIO_AUTH_TOKEN = "test-2";

    fsAccessSync = jest.fn();

    fsReadFileSync = jest.fn();
    when(fsReadFileSync)
      .calledWith(validScenarioFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validScenario), "utf8"));

    capturedOutput = {
      errOut: [],
      stdOut: [],
    };

    const program = createProgram(new Command(), true);
    program.command.configureOutput({
      writeOut: (str) => capturedOutput.stdOut.push(str),
      writeErr: (str) => capturedOutput.errOut.push(str),
    });

    cli = createCli({
      program,
      fsReadFileSync,
      fsAccessSync,
    });
  });

  test("User shown error if config option not set", async () => {
    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", validScenarioFilePath],
      ]);
    } catch (err) {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: required option '-c, --config-path <filePath>' not specified\n"
    );
  });

  test("User shown error if config file is not readable", async () => {
    const configFilePath = "/test/path/config.json";

    fsAccessSync.mockImplementation(() => {
      throw new Error("Not readable");
    });

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", configFilePath],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: option '-c, --config-path <filePath>' argument '/test/path/config.json' is invalid. File '/test/path/config.json' is not readable\n"
    );
    expect(fsAccessSync).toBeCalledWith(configFilePath, fs.constants.R_OK);
  });

  test("User shown error if problem reading config file", async () => {
    const configFilePath = "/test/path/config.json";

    when(fsReadFileSync)
      .calledWith(configFilePath)
      .mockImplementation(() => {
        throw new Error("Test Error Message");
      });

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", configFilePath],
        ...["--scenario-path", validScenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "Failed to read file '/test/path/config.json'. Reason: Test Error Message\n"
    );
    expect(fsReadFileSync).toBeCalledWith(configFilePath);
  });

  test("User shown error if config does not contain valid JSON", async () => {
    const configFilePath = "/test/path/config.json";

    when(fsReadFileSync)
      .calledWith(configFilePath)
      .mockReturnValue(Buffer.from("Malformed JSON"));

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", configFilePath],
        ...["--scenario-path", validScenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "File '/test/path/config.json' not valid JSON. Reason: Unexpected token M in JSON at position 0\n"
    );
  });

  test("User shown error if transcriber module not found", async () => {
    const configFilePath = "/test/path/config.json";
    const configFileContent: JsonConfig = {
      transcriber: {
        name: " invalid* module& name! ",
      },
    };

    when(fsReadFileSync)
      .calledWith(configFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(configFileContent)));

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", configFilePath],
        ...["--scenario-path", validScenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "Invalid config '/test/path/config.json. Reason: Cannot find module 'ivr-tester-transcriber- invalid* module& name! ' for the transcriber ' invalid* module& name! '\n"
    );
  });
});
