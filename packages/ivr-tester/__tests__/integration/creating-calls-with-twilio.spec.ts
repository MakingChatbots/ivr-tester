import getPort from "get-port";
import { Twilio } from "twilio";
import { Config, IvrNumber, IvrTester } from "../../src";
import { TranscriberTestDouble } from "../testDoubles/TranscriberTestDouble";
import { InteractionTestDouble } from "../testDoubles/InteractionTestDouble";

describe("IVR Tester creates calls using Twilio", () => {
  let twilioClient: { calls: { create: jest.Mock } };
  let config: Config;

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

  test.each([
    ["https://example.test/", "wss://example.test/"],
    ["http://example.test/", "ws://example.test/"],
  ])(
    "HTTP(S) public server URL %s converted to WS(S) URL in TWIML %s",
    async (publicServerUrl, webSocketUrl) => {
      twilioClient.calls.create.mockRejectedValue(new Error());

      const testConfig = {
        ...config,
        publicServerUrl,
      };

      await expect(
        new IvrTester(testConfig, new InteractionTestDouble()).run({
          from: "1",
          to: "2",
        })
      ).rejects.toThrowError();

      expect(twilioClient.calls.create).toBeCalledWith(
        expect.objectContaining({
          twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="${webSocketUrl}"><Parameter name="from" value="1"/><Parameter name="to" value="2"/></Stream></Connect></Response>`,
        })
      );
    }
  );

  test("twilio called with phone-numbers and TWIML", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const call: IvrNumber = {
      from: "test-from-number",
      to: "test-to-number",
    };

    await expect(
      new IvrTester(config, new InteractionTestDouble()).run(call)
    ).rejects.toThrowError();

    expect(twilioClient.calls.create).toBeCalledWith({
      from: "test-from-number",
      to: "test-to-number",
      twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="ws://[::]:${config.localServerPort}/"><Parameter name="from" value="test-from-number"/><Parameter name="to" value="test-to-number"/></Stream></Connect></Response>`,
    });
  });

  test("IVR Tester times out if a call takes too long to connect", async () => {
    const newConfig = {
      ...config,
      msTimeoutWaitingForCall: 1000,
    };

    await expect(
      new IvrTester(newConfig, new InteractionTestDouble()).run({
        from: "1",
        to: "2",
      })
    ).rejects.toThrowError("call did not connect after 1s");
  }, 2000);
});
