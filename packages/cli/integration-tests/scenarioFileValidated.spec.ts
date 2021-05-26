import { Cli, createCli } from "../src/cli";
import { accessSync, readFileSync } from "fs";
import { Command } from "commander";
import { createProgram, Program } from "../src/createProgram";
import { JsonConfig } from "../src/options/config/json/JsonConfig";
import { when } from "jest-when";
import fs from "fs";

describe("Scenario file validated", () => {
  const validConfigFilePath = "/test/path/config.json";
  const validConfig: Readonly<JsonConfig> = {
    transcriber: { name: "test" },
  };

  let capturedOutput: {
    stdOut: string[];
    errOut: string[];
  };

  let program: Program;
  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;
  let fsAccessSync: jest.MockedFunction<typeof accessSync>;
  let cli: Cli;

  beforeEach(() => {
    fsAccessSync = jest.fn();

    fsReadFileSync = jest.fn();
    when(fsReadFileSync)
      .calledWith(validConfigFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validConfig), "utf8"));

    capturedOutput = {
      errOut: [],
      stdOut: [],
    };

    program = createProgram(new Command(), true);
    program.command.configureOutput({
      writeOut: (str) => capturedOutput.stdOut.push(str),
      writeErr: (str) => capturedOutput.errOut.push(str),
    });

    const requireModule = (jest.fn().mockReturnValue({
      default: () => jest.fn(),
    }) as unknown) as jest.MockedFunction<NodeJS.Require>;

    cli = createCli({
      program,
      fsReadFileSync,
      fsAccessSync,
      requireModule,
    });
  });

  test("User shown error is scenario file is not readable", async () => {
    const scenarioFilePath = "/test/path/scenario.json";

    when(fsAccessSync)
      .calledWith(scenarioFilePath, fs.constants.R_OK)
      .mockImplementation(() => {
        throw new Error("Not readable");
      });

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", validConfigFilePath],
        ...["--scenario-path", scenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: option '-s, --scenario-path <filePath>' argument '/test/path/scenario.json' is invalid. File '/test/path/scenario.json' is not readable\n"
    );
    expect(fsAccessSync).toBeCalledWith(scenarioFilePath, fs.constants.R_OK);
  });

  test("User shown error if problem reading scenario file", async () => {
    const scenarioFilePath = "/test/path/scenario.json";

    when(fsReadFileSync)
      .calledWith(scenarioFilePath)
      .mockImplementation(() => {
        throw new Error("Test Error Message");
      });

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", validConfigFilePath],
        ...["--scenario-path", scenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "Failed to read file '/test/path/scenario.json'. Reason: Test Error Message\n"
    );
    expect(fsReadFileSync).toBeCalledWith(scenarioFilePath);
  });

  test("User shown error if scenario does not contain valid JSON", async () => {
    const scenarioFilePath = "/test/path/scenario.json";

    when(fsReadFileSync)
      .calledWith(scenarioFilePath)
      .mockReturnValue(Buffer.from("Malformed JSON"));

    let cliThrewError = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--config-path", validConfigFilePath],
        ...["--scenario-path", scenarioFilePath],
      ]);
    } catch {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "File '/test/path/scenario.json' not valid JSON. Reason: Unexpected token M in JSON at position 0\n"
    );
    expect(fsReadFileSync).toBeCalledWith(scenarioFilePath);
  });
});
