import getPort from "get-port";
import { Twilio } from "twilio";
import WebSocket from "ws";
import { Config, IvrNumber, IvrTester } from "../../src";
import { TranscriberTestDouble } from "../testDoubles/TranscriberTestDouble";
import { InteractionTestDouble } from "../testDoubles/InteractionTestDouble";

describe("IVR Tester creates calls using Twilio", () => {
  let twilioClient: { calls: { create: jest.Mock } };
  let config: Config;

  let ws: WebSocket;

  beforeEach(async () => {
    twilioClient = {
      calls: {
        create: jest.fn(),
      },
    };

    config = {
      localServerPort: await getPort(),
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

    const ivrTester = new IvrTester(
      {
        ...config,
        publicServerUrl: "https://example.test/",
      },
      new InteractionTestDouble()
    );

    try {
      await ivrTester.run({ from: "1", to: "2" });
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

    const ivrTester = new IvrTester(
      {
        ...config,
        publicServerUrl: "http://example.test/",
      },
      new InteractionTestDouble()
    );

    try {
      await ivrTester.run({ from: "1", to: "2" });
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
      await new IvrTester(config, new InteractionTestDouble()).run(call);
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith({
      from: "test-from-number",
      to: "test-to-number",
      twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="ws://[::]:${config.localServerPort}/"><Parameter name="from" value="test-from-number"/><Parameter name="to" value="test-to-number"/></Stream></Connect></Response>`,
    });
  });
});
