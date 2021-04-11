import { Cli, createCli, IvrTesterFactory } from "../src/cli";
import { readFileSync } from "fs";
import { Command } from "commander";
import ngrok from "ngrok";
import { createProgram, Program } from "../src/createProgram";

describe("app", () => {
  let program: Program;
  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;

  let cli: Cli;

  let ngrokServer: jest.Mocked<typeof ngrok>;
  let ivrTesterFactory: jest.MockedFunction<IvrTesterFactory>;

  beforeEach(() => {
    const fsAccessSync = jest.fn().mockReturnValue(undefined);
    fsReadFileSync = jest.fn();
    ngrokServer = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      kill: jest.fn(),
      getUrl: jest.fn(),
      getApi: jest.fn(),
      authtoken: jest.fn(),
      getVersion: jest.fn(),
    };
    ivrTesterFactory = jest.fn().mockReturnValue({
      run: jest.fn().mockResolvedValue(undefined),
    });

    program = createProgram(new Command(), true);
    program.command.configureOutput({
      writeOut: () => undefined,
      writeErr: () => undefined,
    });

    cli = createCli({
      program,
      fsReadFileSync,
      fsAccessSync,
      ngrokServer,
      ivrTesterFactory,
    });
  });

  test("IVR Tester passed ngrok public URL", async () => {
    const ngrokPublicUrl = "https://test-url.test";

    fsReadFileSync.mockReturnValue(Buffer.from('{"valid": true}', "utf8"));
    ngrokServer.connect.mockResolvedValue(ngrokPublicUrl);

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--scenario-path", "/test/path/scenario.json"],
    ]);

    expect(ivrTesterFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        publicServerUrl: ngrokPublicUrl,
      })
    );
  });

  test("Schema converted and passed to IVR Tester API", async () => {
    fsReadFileSync.mockReturnValue(Buffer.from('{"valid": true}', "utf8"));
    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    const ivrTesterRun = jest.fn().mockResolvedValue(undefined);
    ivrTesterFactory.mockReturnValue({
      run: ivrTesterRun,
    });

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--scenario-path", "/test/path/scenario.json"],
    ]);

    expect(ivrTesterRun).toHaveBeenCalled();
  });
});
