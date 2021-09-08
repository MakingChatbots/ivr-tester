import { TypedEmitter } from "../Emitter";
import {
  IvrCallFlowInteraction,
  IvrCallFlowInteractionEvents,
  IvrTesterExecution,
  ReadonlyIvrTesterLifecycle,
} from "../IvrTester";
import { Call } from "../call/Call";
import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";

/**
 * Sends a DTMF tone after specified intervals (default of 3 seconds)
 */
export class CallFuzzerInteraction
  extends TypedEmitter<IvrCallFlowInteractionEvents>
  implements IvrCallFlowInteraction {
  private timeoutRef: NodeJS.Timeout;

  private static readonly dtmfTones: ReadonlyArray<string> = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "#",
  ];

  private ivrTesterExecution: IvrTesterExecution;

  constructor(private readonly msIntervalBetweenDtmfTones = 3000) {
    super();
  }

  public initialise(ivrTesterExecution: IvrTesterExecution): void {
    this.ivrTesterExecution = ivrTesterExecution;

    ivrTesterExecution.lifecycleEvents.on(
      "callConnected",
      this.callConnected.bind(this)
    );

    this.setupDebugLogs(ivrTesterExecution.lifecycleEvents);
  }

  private static getRandomDtmfTone(): string {
    return CallFuzzerInteraction.dtmfTones[
      Math.floor(Math.random() * CallFuzzerInteraction.dtmfTones.length)
    ];
  }

  private callConnected({ call }: { call: Call }): void {
    call.on("callMediaStreamStarted", () => {
      this.timeoutRef = setInterval(() => {
        call.sendDtmfTone(CallFuzzerInteraction.getRandomDtmfTone());
      }, this.msIntervalBetweenDtmfTones);
    });

    call.on("callClosed", () => {
      this.clearTimeout();
    });
  }

  private clearTimeout(): void {
    if (this.timeoutRef) {
      clearInterval(this.timeoutRef);
      this.timeoutRef = undefined;
    }
  }

  private setupDebugLogs(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
    lifecycleEvents.on("callServerListening", (event) =>
      console.log("callServerListening", event)
    );
    lifecycleEvents.on("callRequested", (event) =>
      console.log("callRequested", event)
    );
    lifecycleEvents.on("callRequestErrored", (event) =>
      console.log("callRequestedErrored", event)
    );
    lifecycleEvents.on("callConnected", (event) =>
      console.log("callConnected", event)
    );
    lifecycleEvents.on("ivrTesterAborted", (event) =>
      console.log("ivrTesterAborted", event)
    );
    lifecycleEvents.on("callServerStopped", (event) =>
      console.log("callServerStopped", event)
    );
    lifecycleEvents.on("callServerErrored", (event) =>
      console.log("callServerErrored", event)
    );
  }

  public getNumberOfCallsToMake(): number {
    return 1;
  }

  public getPlugins(): IvrTesterPlugin[] {
    return [];
  }

  public shutdown(): void {
    this.clearTimeout();
  }
}
