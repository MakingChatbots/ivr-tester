import { Config } from "./Config";
import { testRunner } from "./testRunner";
import { createMockDtmfGenerator, createMockTranscriber } from "./server.spec";
import { IvrTest, TestSubject } from "./handlers/TestHandler";
import { inOrder } from "./handlers/inOrder";
import getPort from "get-port";

describe("testRunner", () => {
  let twilioClient: { calls: { create: jest.Mock } };

  beforeEach(() => {
    twilioClient = {
      calls: {
        create: jest.fn(),
      },
    };
  });

  // test("Promise resolves when server closes", async () => {
  //   twilioClient.calls.create.mockResolvedValue(undefined);
  //
  //   const config: Config = {
  //     twilioClient: twilioClient as any,
  //     dtmfGenerator: createMockDtmfGenerator(),
  //     transcriber: createMockTranscriber(),
  //     onPassedTest() {},
  //     onFailedTest() {},
  //   };
  //   const ivrTest: IvrTest = {
  //     call: { from: "", to: "" },
  //     test: [],
  //   };
  //
  //   const testRunnerPromise = testRunner(config, ivrTest);
  //
  //   // Wait for server then call to be made
  //   await waitForExpect(() => {
  //     expect(twilioClient.calls.create).toBeCalled();
  //   });
  //
  //   // const calls = twilioClient.calls.create.mock.calls;
  //   const [[{ url }]] = twilioClient.calls.create.mock.calls;
  //   const streamUrl = new URL(url);
  //   streamUrl.pathname = "/stream";
  //   streamUrl.protocol = "ws";
  //
  //   console.log(streamUrl.toString());
  //
  //   const ws = new WebSocket(streamUrl.toString());
  //   await waitForConnection(ws);
  //
  // });

  test("failure making a call results in test-runner failing", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error("Error Occurred"));

    const config: Config = {
      publicServerUrl: "http://example.test/",
      localServerPort: await getPort(),
      twilioClient: twilioClient as any,
      dtmfGenerator: createMockDtmfGenerator(),
      transcriber: () => createMockTranscriber(),
    };
    const ivrTest: IvrTest = {
      name: "",
      test: inOrder([]),
    };

    await expect(() =>
      testRunner(config)({ from: "", to: "" }, ivrTest)
    ).rejects.toThrowError(new Error("Error Occurred"));
  });

  test("twilio called with public URL to twiml and phone-numbers", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const config: Config = {
      publicServerUrl: "http://example.test/",
      localServerPort: await getPort(),
      twilioClient: twilioClient as any,
      dtmfGenerator: createMockDtmfGenerator(),
      transcriber: () => createMockTranscriber(),
    };
    const call: TestSubject = {
      from: "test-from-number",
      to: "test-to-number",
    };

    try {
      await testRunner(config)(call, { name: "", test: inOrder([]) });
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith({
      from: "test-from-number",
      to: "test-to-number",
      twiml:
        '<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="wss://example.test/"><Parameter name="from" value="test-from-number"/><Parameter name="to" value="test-to-number"/></Stream></Connect></Response>',
    });
  });

  test("twilio called with URL of local server if no public URL configured", async () => {
    twilioClient.calls.create.mockRejectedValue(new Error());

    const config: Config = {
      localServerPort: await getPort(),
      twilioClient: twilioClient as any,
      dtmfGenerator: createMockDtmfGenerator(),
      transcriber: () => createMockTranscriber(),
    };
    const call: TestSubject = {
      from: "",
      to: "",
    };

    try {
      await testRunner(config)(call, { name: "", test: inOrder([]) });
    } catch (err) {
      /* Intentionally ignore*/
    }

    expect(twilioClient.calls.create).toBeCalledWith({
      from: "",
      to: "",
      twiml: expect.stringMatching(
        /<\?xml version="1\.0" encoding="UTF-8"\?><Response><Connect><Stream url="wss:\/\/\[::]:\d+\/"><Parameter name="from" value=""\/><Parameter name="to" value=""\/><\/Stream><\/Connect><\/Response>/
      ),
    });
  });
});
