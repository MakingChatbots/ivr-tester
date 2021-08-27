import getPort from "get-port";
import { Twilio } from "twilio";
import { Config, IvrTester } from "../src";
import { TranscriberTestDouble } from "./testDoubles/TranscriberTestDouble";
import waitForExpect from "wait-for-expect";
import { InteractionTestDouble } from "./testDoubles/InteractionTestDouble";
import {
  simulateTwilioCall,
  TwilioCallStream,
} from "./testDoubles/simulateTwilioCall";
import { TranscriptEvent } from "ivr-tester";

describe("Transcriber", () => {
  let config: Config;
  let simulatedCallFromTwilio: TwilioCallStream;

  beforeEach(async () => {
    config = {
      localServerPort: await getPort(),
      twilioAuth: { accountSid: "test", authToken: "test" },
      twilioClientFactory: () =>
        (({
          calls: {
            create: jest.fn().mockResolvedValue(undefined),
          },
        } as unknown) as Twilio),
      dtmfGenerator: { generate: jest.fn() },
      transcriber: {
        create: () => new TranscriberTestDouble(),
        checkCanRun: () => ({ canRun: true }),
      },
    };
  });

  afterEach(() => simulatedCallFromTwilio.close());

  test("Media payloads from Twilio are passed to the transcriber", async () => {
    const interaction = new InteractionTestDouble(1);
    const runnerPromise = new IvrTester(config, interaction).run({
      from: "123",
      to: "456",
    });

    // Simulate Twilio connecting a call's stream
    simulatedCallFromTwilio = await simulateTwilioCall(
      `ws://[::]:${config.localServerPort}/`
    );

    const transcriptionEvents: TranscriptEvent[] = [];
    interaction.call
      .getTranscriber()
      .on("transcription", (event) => transcriptionEvents.push(event));

    await simulatedCallFromTwilio.sendMediaPayload(Buffer.from([1, 2, 3]));

    await waitForExpect(() => {
      expect(transcriptionEvents).toEqual([
        {
          transcription: JSON.stringify(Buffer.from([1, 2, 3])),
          isFinal: expect.any(Boolean),
        },
      ]);
    });

    interaction.stopIvrTesterExecution({
      dueToFailure: false,
    });
    await runnerPromise;
  });
});
