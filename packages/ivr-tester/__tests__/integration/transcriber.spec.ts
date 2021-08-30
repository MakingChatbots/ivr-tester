import getPort from "get-port";
import { Twilio } from "twilio";
import {
  Config,
  IvrCallFlowInteraction,
  IvrCallFlowInteractionEvents,
  IvrTester,
  IvrTesterExecution,
  IvrTesterPlugin,
  StopParams,
  TranscriberPlugin,
  TranscriptionEvents,
  TypedEmitter,
} from "../../src";
// import { TranscriberTestDouble } from "../testDoubles/TranscriberTestDouble";
// import { InteractionTestDouble } from "../testDoubles/InteractionTestDouble";
import waitForExpect from "wait-for-expect";
// import {
//   simulateTwilioCall,
//   TwilioCallStream,
// } from "../testDoubles/simulateTwilioCall";
import { TranscriptEvent } from "ivr-tester";
import { Call } from "../../src/call/Call";
import WebSocket from "ws";

export interface TwilioCallStream {
  sendMediaPayload(data: Buffer): void;
  isClosed(): boolean;
  close(): void;
}

export async function simulateTwilioCall(
  serverUrl: string
): Promise<TwilioCallStream> {
  const waitForConnection = async (ws: WebSocket): Promise<void> =>
    new Promise((resolve) => {
      ws.on("open", resolve);
    });

  const ws = new WebSocket(serverUrl);
  await waitForConnection(ws);

  return {
    async sendMediaPayload(data: Buffer): Promise<void> {
      const payload = {
        event: "media",
        media: {
          payload: data.toString("base64"),
        },
      };

      return new Promise((resolve, reject) => {
        ws.send(JSON.stringify(payload), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
    close(): void {
      if (
        this.ws &&
        ![this.ws.CLOSED, this.ws.CLOSING].includes(this.ws.readyState)
      ) {
        this.ws.close();
      }
    },

    isClosed(): boolean {
      return this.ws.readyState === this.ws.CLOSED;
    },
  };
}

export class InteractionTestDouble
  extends TypedEmitter<IvrCallFlowInteractionEvents>
  implements IvrCallFlowInteraction {
  private _hasInitialisedBeenCalled = false;
  private ivrTesterExecution: IvrTesterExecution;
  public call: Call;

  constructor(
    private readonly numberOfCallsToMake: number = 1,
    private readonly callbackOnInitialise?: (
      ivrTesterExecution: IvrTesterExecution
    ) => void
  ) {
    super();
  }

  public get hasInitialisedBeenCalled(): boolean {
    return this._hasInitialisedBeenCalled;
  }

  public initialise(ivrTesterExecution: IvrTesterExecution): void {
    this._hasInitialisedBeenCalled = true;
    this.ivrTesterExecution = ivrTesterExecution;
    this.ivrTesterExecution.lifecycleEvents.on("callConnected", ({ call }) => {
      this.call = call;
    });

    if (this.callbackOnInitialise) {
      this.callbackOnInitialise(ivrTesterExecution);
    }
  }

  public getNumberOfCallsToMake(): number {
    return this.numberOfCallsToMake;
  }

  public stopIvrTesterExecution(stopParams: StopParams): void {
    if (!this._hasInitialisedBeenCalled) {
      throw new Error("initialise not called by IvrTester");
    }

    return this.ivrTesterExecution.stop(stopParams);
  }

  public getPlugins(): IvrTesterPlugin[] {
    return [];
  }
}

export class TranscriberTestDouble
  extends TypedEmitter<TranscriptionEvents>
  implements TranscriberPlugin {
  public close(): void {
    //Intentionally empty
  }

  public transcribe(payload: Buffer): void {
    this.produceTranscriptionEvent(JSON.stringify(payload));
  }

  private produceTranscriptionEvent(transcription: string) {
    const event: TranscriptEvent = { transcription, isFinal: true };
    this.emit("transcription", event);
  }

  public transcriptionComplete(): void {
    //Intentionally empty
  }
}

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
