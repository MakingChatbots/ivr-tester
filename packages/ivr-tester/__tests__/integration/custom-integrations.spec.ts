import getPort from "get-port";
import { Twilio } from "twilio";
import waitForExpect from "wait-for-expect";
import { URL } from "url";
import { Config, IvrTester } from "../../src";
import { TranscriberTestDouble } from "../testDoubles/TranscriberTestDouble";
import { InteractionTestDouble } from "../testDoubles/InteractionTestDouble";
import {
  simulateTwilioCall,
  TwilioCallStream,
} from "../testDoubles/simulateTwilioCall";

describe("Custom integrations", () => {
  let config: Config;
  let simulatedCallFromTwilio: TwilioCallStream;

  beforeEach(async () => {
    const twilioClient = {
      calls: {
        create: jest.fn().mockResolvedValue(undefined),
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
    if (simulatedCallFromTwilio) {
      simulatedCallFromTwilio.close();
      simulatedCallFromTwilio = undefined;
    }
  });

  test("IVR Tester stops when interaction calls stop on IVR Tester's execution", async () => {
    const interaction = new InteractionTestDouble(1);
    const runnerPromise = new IvrTester(config, interaction).run({
      from: "123",
      to: "456",
    });

    await waitForExpect(() => {
      expect(interaction.hasInitialisedBeenCalled).toBe(true);
    });

    interaction.stopIvrTesterExecution({
      dueToFailure: false,
    });

    await runnerPromise;
  });

  test("IVR Tester stops and throws error when interaction stops IVR Tester's execution due to failure", async () => {
    const interaction = new InteractionTestDouble(1);
    const runnerPromise = new IvrTester(config, interaction).run({
      from: "123",
      to: "456",
    });

    await waitForExpect(() => {
      expect(interaction.hasInitialisedBeenCalled).toBe(true);
    });

    interaction.stopIvrTesterExecution({
      dueToFailure: true,
      reason: "test error",
    });

    await expect(runnerPromise).rejects.toEqual(new Error("test error"));
  });

  test("IVR Tester calls shutdown when all calls disconnect", async () => {
    const interaction = new InteractionTestDouble(1);
    jest.spyOn(interaction, "shutdown");

    const runnerPromise = new IvrTester(config, interaction).run({
      from: "123",
      to: "456",
    });

    // Simulate Twilio connecting a call's stream
    simulatedCallFromTwilio = await simulateTwilioCall(
      `ws://[::]:${config.localServerPort}/`
    );

    expect(interaction.shutdown).not.toHaveBeenCalled();

    simulatedCallFromTwilio.close();

    await waitForExpect(() => {
      expect(interaction.shutdown).toHaveBeenCalled();
    });

    await runnerPromise;
  });

  test("Lifecycle events produced in order for aborted instance", async () => {
    const events: { event: string; payload: unknown }[] = [];

    const interaction = new InteractionTestDouble(1, (ivrTesterExecution) => {
      const lifecycle = ivrTesterExecution.lifecycleEvents;
      lifecycle.on("callServerListening", (payload) =>
        events.push({ event: "callServerListening", payload })
      );
      lifecycle.on("callRequested", (payload) =>
        events.push({ event: "callRequested", payload })
      );
      lifecycle.on("callRequestErrored", (payload) =>
        events.push({ event: "callRequestErrored", payload })
      );
      lifecycle.on("callConnected", (payload) =>
        events.push({ event: "callConnected", payload })
      );
      lifecycle.on("ivrTesterAborted", (payload) =>
        events.push({ event: "ivrTesterAborted", payload })
      );
      lifecycle.on("callServerStopped", (payload) =>
        events.push({ event: "callServerStopped", payload })
      );
      lifecycle.on("callServerErrored", (payload) =>
        events.push({ event: "callServerErrored", payload })
      );
    });

    const instance = new IvrTester(config, interaction).run({
      from: "123",
      to: "456",
    });

    await waitForExpect(() => {
      expect(interaction.hasInitialisedBeenCalled).toBe(true);
    });

    interaction.stopIvrTesterExecution({
      dueToFailure: false,
    });

    await instance;
    expect(events).toEqual([
      {
        event: "callServerListening",
        payload: {
          localUrl: expect.any(URL),
        },
      },
      {
        event: "callRequested",
        payload: {
          requestedCall: {
            call: {
              from: "123",
              to: "456",
            },
            type: "telephony",
          },
          total: 1,
        },
      },
      {
        event: "ivrTesterAborted",
        payload: {
          dueToFailure: false,
        },
      },
      {
        event: "callServerStopped",
      },
    ]);
  });
});
