import { describe, test, expect, beforeEach, vi, type MockedFunction } from "vitest";
import { Cli, createCli } from "../src/cli";
import { accessSync, readFileSync } from "fs";
import { Command } from "commander";
import { createProgram, Program } from "../src/createProgram";
import { JsonConfig } from "../src/options/config/json/JsonConfig";
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
  let fsReadFileSync: MockedFunction<typeof readFileSync>;
  let fsAccessSync: MockedFunction<typeof accessSync>;
  let cli: Cli;

  beforeEach(() => {
    fsAccessSync = vi.fn();

    fsReadFileSync = vi.fn();
    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

    capturedOutput = {
      errOut: [],
      stdOut: [],
    };

    program = createProgram(new Command(), true);
    program.command.configureOutput({
      writeOut: (str) => capturedOutput.stdOut.push(str),
      writeErr: (str) => capturedOutput.errOut.push(str),
    });

    const requireModule = (vi.fn().mockReturnValue({
      default: () => vi.fn(),
    }) as unknown) as MockedFunction<NodeJS.Require>;

    cli = createCli({
      program,
      fsReadFileSync,
      fsAccessSync,
      requireModule,
    });
  });

  test("User shown error is scenario file is not readable", async () => {
    const scenarioFilePath = "/test/path/scenario.json";

    fsAccessSync.mockImplementation(((
      path: fs.PathLike,
      mode?: number
    ) => {
      if (path === scenarioFilePath && mode === fs.constants.R_OK) {
        throw new Error("Not readable");
      }
    }) as typeof accessSync);

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

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      if (path === scenarioFilePath) throw new Error("Test Error Message");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      if (path === scenarioFilePath) return Buffer.from("Malformed JSON");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
    expect(capturedOutput.errOut[0]).toMatch(
      /File '\/test\/path\/scenario\.json' not valid JSON\. Reason: /
    );
    expect(fsReadFileSync).toBeCalledWith(scenarioFilePath);
  });
});
