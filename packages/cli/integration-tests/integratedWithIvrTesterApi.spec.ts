import { describe, test, expect, beforeEach, vi, type Mocked, type MockedFunction } from "vitest";
import { Cli, createCli, IvrTesterFactory } from "../src/cli";
import { readFileSync } from "fs";
import { Command } from "commander";
import ngrok from "ngrok";
import { createProgram, Program } from "../src/createProgram";
import { JsonScenario } from "../src/options/scenario/json/jsonScenario";
import { JsonConfig } from "../src/options/config/json/JsonConfig";

type TranscriberModule = (options: Record<string, unknown>) => any;

describe("Integrated with IVR Tester API", () => {
  let program: Program;
  let fsReadFileSync: MockedFunction<typeof readFileSync>;

  let cli: Cli;

  let ngrokServer: Mocked<typeof ngrok>;
  let ivrTesterFactory: MockedFunction<IvrTesterFactory>;
  let transcriberModule: MockedFunction<TranscriberModule>;
  let requireModule: MockedFunction<NodeJS.Require>;

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

  beforeEach(() => {
    process.env.TWILIO_ACCOUNT_SID = "test-1";
    process.env.TWILIO_AUTH_TOKEN = "test-2";

    const fsAccessSync = vi.fn().mockReturnValue(undefined);
    fsReadFileSync = vi.fn();
    ngrokServer = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      kill: vi.fn(),
      getUrl: vi.fn(),
      getApi: vi.fn(),
      authtoken: vi.fn(),
      getVersion: vi.fn(),
    };
    ivrTesterFactory = vi.fn().mockReturnValue({
      run: vi.fn().mockResolvedValue(undefined),
    });

    transcriberModule = vi.fn().mockReturnValue({});
    requireModule = (vi.fn().mockReturnValue({
      default: transcriberModule,
    }) as unknown) as MockedFunction<NodeJS.Require>;

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

  test("ngrok's public URL passed to IVR Tester API", async () => {
    const ngrokPublicUrl = "https://test-url.test";

    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

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
    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    const ivrTesterRun = vi.fn().mockResolvedValue(undefined);
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
    fsReadFileSync.mockImplementation(((path: string) => {
      if (path === validConfigFilePath)
        return Buffer.from(JSON.stringify(validConfig), "utf8");
      if (path === validScenarioFilePath)
        return Buffer.from(JSON.stringify(validScenario), "utf8");
      throw new Error(`Unexpected path: ${path}`);
    }) as typeof readFileSync);

    ngrokServer.connect.mockResolvedValue("https://test-url.test");

    ivrTesterFactory.mockReturnValue({ run: vi.fn() });

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
