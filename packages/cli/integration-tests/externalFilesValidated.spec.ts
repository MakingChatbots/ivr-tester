import { Cli, createCli } from "../src/cli";
import { accessSync, readFileSync } from "fs";
import { Command } from "commander";
import { createProgram, Program } from "../src/createProgram";

describe("External files validated", () => {
  let capturedOutput: {
    stdOut: string[];
    errOut: string[];
  };

  let program: Program;
  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;
  let fsAccessSync: jest.MockedFunction<typeof accessSync>;
  let cli: Cli;

  beforeEach(() => {
    fsReadFileSync = jest.fn();
    fsAccessSync = jest.fn();

    capturedOutput = {
      errOut: [],
      stdOut: [],
    };

    program = createProgram(new Command(), true);
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

  test("Error thrown if scenario file is not readable", async () => {
    fsAccessSync.mockImplementation(() => {
      throw new Error("Not readable");
    });

    let errorIsThrown = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      errorIsThrown = true;
    }

    expect(errorIsThrown).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: option '-s, --scenario-path <filePath>' argument '/test/path/scenario.json' is invalid. File '/test/path/scenario.json' is not readable\n"
    );
  });

  test("User shown error if problem reading schema file", async () => {
    fsReadFileSync.mockImplementation(() => {
      throw new Error("Test Error Message");
    });

    let errorIsThrown = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      errorIsThrown = true;
    }

    expect(errorIsThrown).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "Failed to read file '/test/path/scenario.json'. Reason: Test Error Message\n"
    );
  });

  test("User shown error if schema does not contain valid JSON", async () => {
    fsReadFileSync.mockReturnValue(Buffer.from("Malformed JSON"));

    let errorIsThrown = false;
    try {
      await cli([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      errorIsThrown = true;
    }

    expect(errorIsThrown).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "File '/test/path/scenario.json' not valid JSON. Reason: Unexpected token M in JSON at position 0\n"
    );
  });
});
