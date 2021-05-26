import { Cli, createCli, IvrTesterFactory } from "../src/cli";
import { readFileSync } from "fs";
import { Command } from "commander";
import ngrok from "ngrok";
import { createProgram, Program } from "../src/createProgram";
import { when } from "jest-when";
import { JsonScenario } from "../src/options/scenario/json/jsonScenario";
import { JsonConfig } from "../src/options/config/json/JsonConfig";

type TranscriberModule = (options: Record<string, unknown>) => any;

describe("Integrated with IVR Tester API", () => {
  let program: Program;
  let fsReadFileSync: jest.MockedFunction<typeof readFileSync>;

  let cli: Cli;

  let ngrokServer: jest.Mocked<typeof ngrok>;
  let ivrTesterFactory: jest.MockedFunction<IvrTesterFactory>;
  let transcriberModule: jest.MockedFunction<TranscriberModule>;
  let requireModule: jest.MockedFunction<NodeJS.Require>;

  beforeEach(() => {
    process.env.TWILIO_ACCOUNT_SID = "test-1";
    process.env.TWILIO_AUTH_TOKEN = "test-2";

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

    transcriberModule = jest.fn().mockReturnValue({});
    requireModule = (jest.fn().mockReturnValue({
      default: transcriberModule,
    }) as unknown) as jest.MockedFunction<NodeJS.Require>;

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
      requireModule,
    });
  });

  const validScenarioFilePath = "/test/path/scenario.json";
  const validScenario: Readonly<JsonScenario> = {
    name: "test-scenario",
    steps: [],
  };

  const validConfigFilePath = "/test/path/config.json";
  const validConfig: Readonly<JsonConfig> = {
    transcriber: {
      name: "test",
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

    when(fsReadFileSync)
      .calledWith(validConfigFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validConfig), "utf8"))
      .calledWith(validScenarioFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validScenario), "utf8"));

    ngrokServer.connect.mockResolvedValue(ngrokPublicUrl);

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--config-path", validConfigFilePath],
      ...["--scenario-path", validScenarioFilePath],
    ]);

    expect(ivrTesterFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        publicServerUrl: ngrokPublicUrl,
      })
    );
  });

  test("JSON Scenario passed to IVR Tester API", async () => {
    when(fsReadFileSync)
      .calledWith(validConfigFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validConfig), "utf8"))
      .calledWith(validScenarioFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validScenario), "utf8"));

    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    const ivrTesterRun = jest.fn().mockResolvedValue(undefined);
    ivrTesterFactory.mockReturnValue({
      run: ivrTesterRun,
    });

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--config-path", validConfigFilePath],
      ...["--scenario-path", validScenarioFilePath],
    ]);

    expect(fsReadFileSync).toHaveBeenCalledWith(validScenarioFilePath);
    expect(ivrTesterRun).toHaveBeenCalledWith(
      { from: "0123456789", to: "9876543210" },
      {
        name: "test-scenario",
        steps: [],
      }
    );
  });

  test("Config passed to IVR Tester API", async () => {
    when(fsReadFileSync)
      .calledWith(validConfigFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validConfig), "utf8"))
      .calledWith(validScenarioFilePath)
      .mockReturnValue(Buffer.from(JSON.stringify(validScenario), "utf8"));

    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    ivrTesterFactory.mockReturnValue({ run: jest.fn() });

    await cli([
      ...["node", "/path/to/cli"],
      ...["--from", "0123456789"],
      ...["--to", "9876543210"],
      ...["--config-path", validConfigFilePath],
      ...["--scenario-path", validScenarioFilePath],
    ]);

    expect(transcriberModule).toBeCalledWith({
      languageCode: "en-GB",
      useEnhanced: true,
    });
    expect(ivrTesterFactory).toHaveBeenCalledWith({
      localServerPort: 123,
      twilioAuth: {
        accountSid: "test-1",
        authToken: "test-2",
      },
      publicServerUrl: "https://test-url.test",
      recording: {
        transcript: {
          filename: "/test-filename",
          outputPath: "/test/path",
        },
      },
      transcriber: expect.any(Object),
    });
  });
});
