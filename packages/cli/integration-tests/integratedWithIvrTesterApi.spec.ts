import { Cli, createCli, IvrTesterFactory } from "../src/cli";
import { readFileSync } from "fs";
import { Command } from "commander";
import ngrok from "ngrok";
import { createProgram, Program } from "../src/createProgram";
import { when } from "jest-when";
import { JsonScenario } from "../src/options/scenario/json/jsonScenario";
import { JsonConfig } from "../src/options/config/json/JsonConfig";

describe("Integrated with IVR Tester API", () => {
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

  const validScenario: Readonly<JsonScenario> = {
    name: "test-scenario",
    steps: [],
  };

  const validConfig: Readonly<JsonConfig> = {
    transcriber: {
      name: "google-speech-to-text",
      options: {
        languageCode: "en-GB",
        useEnhanced: true,
      },
    },
    localServerPort: 123,
    recording: {
      transcript: {
        filename: "/test-filename",
        outputPath: "/test/path",
      },
    },
  };

  test("ngrok's public URL passed to IVR Tester API", async () => {
    const ngrokPublicUrl = "https://test-url.test";

    fsReadFileSync.mockReturnValue(
      Buffer.from(JSON.stringify(validScenario), "utf8")
    );
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

  test("JSON Scenario passed to IVR Tester API", async () => {
    fsReadFileSync.mockReturnValue(
      Buffer.from(JSON.stringify(validScenario), "utf8")
    );
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

    expect(fsReadFileSync).toHaveBeenCalledWith("/test/path/scenario.json");
    expect(ivrTesterRun).toHaveBeenCalledWith(
      { from: "0123456789", to: "9876543210" },
      {
        name: "test-scenario",
        steps: [],
      }
    );
  });

  test("Config passed to IVR Tester API", async () => {
    const scenarioFilePath = "/test/path/scenario.json";
    const configFilePath = "/test/path/config.json";

    when(fsReadFileSync)
      .calledWith(scenarioFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validScenario), "utf8"))
      .calledWith(configFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validConfig), "utf8"));

    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    ivrTesterFactory.mockReturnValue({ run: jest.fn() });

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--scenario-path", scenarioFilePath],
      ...["--config-path", configFilePath],
    ]);

    expect(ivrTesterFactory).toHaveBeenCalledWith({
      localServerPort: 123,
      publicServerUrl: "https://test-url.test",
      recording: {
        transcript: {
          filename: "/test-filename",
          outputPath: "/test/path",
        },
      },
      transcriber: {
        checkCanRun: expect.any(Function),
        create: expect.any(Function),
      },
    });
  });
});
