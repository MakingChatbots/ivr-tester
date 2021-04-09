import { App, createApp } from "../src/app";
import { accessSync, readFileSync } from "fs";
import commander, { Command } from "commander";

describe("app", () => {
  let capturedOutput: {
    stdOut: string[];
    errOut: string[];
  };

  let program: commander.Command;
  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;
  let fsAccessSync: jest.MockedFunction<typeof accessSync>;
  let app: App;

  beforeEach(() => {
    fsReadFileSync = jest.fn();
    fsAccessSync = jest.fn();

    capturedOutput = {
      errOut: [],
      stdOut: [],
    };

    program = new Command();
    program.exitOverride();
    program.configureOutput({
      writeOut: (str) => capturedOutput.stdOut.push(str),
      writeErr: (str) => capturedOutput.errOut.push(str),
    });

    app = createApp({
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
      await app([
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
      "error: option '-s, --scenario-path <filePath>' argument '/test/path/scenario.json' is invalid. Schema file '/test/path/scenario.json' is not readable\n"
    );
  });

  test("User shown error if problem reading schema file", async () => {
    fsReadFileSync.mockImplementation(() => {
      throw new Error("Test Error Message");
    });

    let errorIsThrown = false;
    try {
      await app([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      errorIsThrown = true;
    }

    // TODO If customer error then I think I have to print output myself (thrown error is ugly and includes stacktrace)
    // Wonder if I can capture output like with parse errors
    expect(errorIsThrown).toBe(true);
    expect(capturedOutput.errOut).toContain(
      "error: option '-s, --scenario-path <filePath>' argument '/test/path/scenario.json' is invalid. Failed to read schema file '/test/path/scenario.json'. Reason: Test Error Message\n"
    );
  });

  test("User shown error if schema does not contain valid JSON", async () => {
    fsReadFileSync.mockReturnValue(Buffer.from("Malformed JSON"));

    let error: Error;
    try {
      await app([
        ...["node", "/path/to/cli"],
        ...["--from", "0123456789"],
        ...["--to", "9876543210"],
        ...["--scenario-path", "/test/path/scenario.json"],
      ]);
    } catch (err) {
      error = err;
    }

    expect(error.message).toContain(
      "Schema file '/test/path/scenario.json' not valid JSON. Reason: Unexpected token M in JSON at position 0"
    );
  });
});
