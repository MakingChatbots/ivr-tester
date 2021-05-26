import { Config } from "./configuration/Config";
import { IvrTester } from "./testRunner";
import getPort from "get-port";
import { Twilio } from "twilio";
import {
  TranscriberPlugin,
  TranscriptEvent,
} from "./call/transcription/plugin/TranscriberPlugin";
import { EventEmitter } from "events";
import WebSocket from "ws";
import waitForExpect from "wait-for-expect";
import { IvrNumber } from "./configuration/call/IvrNumber";

const waitForConnection = async (ws: WebSocket): Promise<void> =>
  new Promise((resolve) => ws.on("open", resolve));

const TwilioPacketGenerator = {
  sendMedia: (ws: WebSocket, data: Buffer) => {
    const payload = {
      event: "media",
      media: {
        payload: data.toString("base64"),
      },
    };

    ws.send(JSON.stringify(payload));
  },
};

class TranscriberTestDouble extends EventEmitter implements TranscriberPlugin {
  public close(): void {
    //Intentionally empty
  }
  public transcribe(): void {
    //Intentionally empty
  }

  public produceTranscriptionEvent(transcription: string) {
    const event: TranscriptEvent = { transcription, isFinal: true };
    this.emit("transcription", event);
  }

  public transcriptionComplete(): void {
    //Intentionally empty
  }
}

describe("Test Runner", () => {
  let callServerPort: number;
  let twilioClient: { calls: { create: jest.Mock } };
  let commonConfig: Config;

  let ws: WebSocket;

  beforeEach(async () => {
    twilioClient = {
      calls: {
        create: jest.fn(),
      },
    };

    callServerPort = await getPort();
    commonConfig = {
      localServerPort: callServerPort,
      twilioAuth: { accountSid: "test", authToken: "test" },
      twilioClientFactory: () => (twilioClient as unknown) as Twilio,
      dtmfGenerator: { generate: jest.fn() },
      transcriber: {
        create: () => new TranscriberTestDouble(),
        checkCanRun: () => ({ canRun: true }),
      },
    };
  });

  afterEach(() => {
    if (ws && ![ws.CLOSED, ws.CLOSING].includes(ws.readyState)) {
      ws.close();
    }
  });

  test("HTTPS public server URL converted to WSS URL in TWIML", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const ivrTester = new IvrTester({
      ...commonConfig,
      publicServerUrl: "https://example.test/",
    });

    try {
      await ivrTester.run(
        { from: "1", to: "2" },
        { name: "test name", steps: [] }
      );
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith(
      expect.objectContaining({
        twiml:
          '<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="wss://example.test/"><Parameter name="from" value="1"/><Parameter name="to" value="2"/></Stream></Connect></Response>',
      })
    );
  });

  test("HTTP public server URL converted to WS URL in TWIML", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const ivrTester = new IvrTester({
      ...commonConfig,
      publicServerUrl: "http://example.test/",
    });

    try {
      await ivrTester.run(
        { from: "1", to: "2" },
        { name: "test name", steps: [] }
      );
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith(
      expect.objectContaining({
        twiml:
          '<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="ws://example.test/"><Parameter name="from" value="1"/><Parameter name="to" value="2"/></Stream></Connect></Response>',
      })
    );
  });

  test("twilio called with phone-numbers and TWIML", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const call: IvrNumber = {
      from: "test-from-number",
      to: "test-to-number",
    };

    try {
      await new IvrTester(commonConfig).run(call, {
        name: "test name",
        steps: [],
      });
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith({
      from: "test-from-number",
      to: "test-to-number",
      twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="ws://[::]:${callServerPort}/"><Parameter name="from" value="test-from-number"/><Parameter name="to" value="test-to-number"/></Stream></Connect></Response>`,
    });
  });

  test("server closed when failure making call", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error("Error Occurred"));

    await expect(() =>
      new IvrTester(commonConfig).run(
        { from: "1", to: "2" },
        { name: "test name", steps: [] }
      )
    ).rejects.toThrowError(new Error("Error Occurred"));
  });

  test("Call Server closed when test finishes", async () => {
    twilioClient.calls.create.mockResolvedValue(undefined);

    const transcriber = new TranscriberTestDouble();
    jest.spyOn(transcriber, "transcribe").mockImplementation(() => {
      transcriber.produceTranscriptionEvent("hello world");
    });

    const config: Config = {
      ...commonConfig,
      transcriber: {
        create: () => transcriber,
        checkCanRun: () => ({ canRun: true }),
      },
    };

    const ivrTester = new IvrTester(config);
    const runnerPromise = ivrTester.run(
      { from: "1", to: "2" },
      { name: "test name", steps: [] }
    );

    // Wait for calls to be made
    await waitForExpect(() => {
      expect(twilioClient.calls.create).toBeCalled();
    });

    // Simulate Twilio connecting a call's stream
    ws = new WebSocket(`ws://[::]:${callServerPort}/`);
    await waitForConnection(ws);

    TwilioPacketGenerator.sendMedia(ws, Buffer.from([0, 1, 2, 3]));

    await runnerPromise;
    await waitForExpect(() => expect(ws.readyState).toBe(ws.CLOSED));
  });

  // test("individual call times out if call not connected after predefined time", () => {
  // No audio is received from the call
  //   * No media events received
  //   * No transcription events (what if music is playing)
  // No media is sent to the call
  // Timeout on a per-call basis
  // expect(true).toBe(false);
  // });

  // test("individual test times out if no transcription after predefined time", () => {
  // No audio is received from the call
  //   * No media events received
  //   * No transcription events (what if music is playing)
  // No media is sent to the call
  // Timeout on a per-call basis
  // expect(true).toBe(false);
  // });
});
