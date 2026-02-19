import type { accessSync, readFileSync } from "node:fs";
import * as fs from "node:fs";
import { Command } from "commander";
import {
  beforeEach,
  describe,
  expect,
  type MockedFunction,
  test,
  vi,
} from "vitest";
import { type Cli, createCli } from "../src/cli";
import { createProgram } from "../src/createProgram";
import type { JsonConfig } from "../src/options/config/json/JsonConfig";
import type { JsonScenario } from "../src/options/scenario/json/jsonScenario";

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

  let fsReadFileSync: MockedFunction<typeof readFileSync>;
  let fsAccessSync: MockedFunction<typeof accessSync>;
  let cli: Cli;

  beforeEach(() => {
    process.env.TWILIO_ACCOUNT_SID = "test-1";
    process.env.TWILIO_AUTH_TOKEN = "test-2";

    fsAccessSync = vi.fn();

    fsReadFileSync = vi.fn();
    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
    } catch (_err) {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: required option '-c, --config-path <filePath>' not specified\n",
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
    } catch (_err) {
      cliThrewError = true;
    }

    expect(cliThrewError).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: option '-c, --config-path <filePath>' argument '/test/path/config.json' is invalid. File '/test/path/config.json' is not readable\n",
    );
    expect(fsAccessSync).toBeCalledWith(configFilePath, fs.constants.R_OK);
  });

  test("User shown error if problem reading config file", async () => {
    const configFilePath = "/test/path/config.json";

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      if (path === configFilePath) throw new Error("Test Error Message");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
      "Failed to read file '/test/path/config.json'. Reason: Test Error Message\n",
    );
    expect(fsReadFileSync).toBeCalledWith(configFilePath);
  });

  test("User shown error if config does not contain valid JSON", async () => {
    const configFilePath = "/test/path/config.json";

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      if (path === configFilePath) return Buffer.from("Malformed JSON");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
    expect(capturedOutput.errOut[0]).toMatch(
      /File '\/test\/path\/config\.json' not valid JSON\. Reason: /,
    );
  });

  test("User shown error if transcriber module not found", async () => {
    const configFilePath = "/test/path/config.json";
    const configFileContent: JsonConfig = {
      transcriber: {
        name: " invalid* module& name! ",
      },
    };

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      if (path === configFilePath)
        return Buffer.from(JSON.stringify(configFileContent));
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
    expect(capturedOutput.errOut[0]).toMatch(
      /Invalid config '\/test\/path\/config\.json\. Reason: /,
    );
  });
});
