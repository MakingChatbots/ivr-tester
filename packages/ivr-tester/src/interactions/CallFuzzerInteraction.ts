import { TypedEmitter } from "../Emitter";
import {
  IvrCallFlowInteraction,
  IvrCallFlowInteractionEvents,
  IvrTesterExecution,
} from "../IvrTester";
import { Call } from "../call/Call";
import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { Ui } from "./Ui";

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
  private ui: Ui;

  constructor(
    private readonly msIntervalBetweenDtmfTones = 3000,
    private readonly intervalSet: typeof setInterval = setInterval,
    private readonly intervalClear: typeof clearInterval = clearInterval
  ) {
    super();
  }

  public initialise(ivrTesterExecution: IvrTesterExecution, ui: Ui): void {
    this.ivrTesterExecution = ivrTesterExecution;
    this.ui = ui;

    ivrTesterExecution.lifecycleEvents.on(
      "callConnected",
      this.callConnected.bind(this)
    );
  }

  private static getRandomDtmfTone(): string {
    return CallFuzzerInteraction.dtmfTones[
      Math.floor(Math.random() * CallFuzzerInteraction.dtmfTones.length)
    ];
  }

  private static extractTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  private callConnected({ call }: { call: Call }): void {
    call.on("callMediaStreamStarted", () => {
      this.timeoutRef = this.intervalSet(() => {
        const randomTone = CallFuzzerInteraction.getRandomDtmfTone();

        const timestamp = CallFuzzerInteraction.extractTime(new Date());
        call.sendDtmfTone(randomTone);
        this.ui.reportProgressUpdate(
          `${timestamp}: Pressed tone '${randomTone}'`
        );
      }, this.msIntervalBetweenDtmfTones);
    });

    call.on("callClosed", () => {
      this.clearTimeout();
    });
  }

  private clearTimeout(): void {
    if (this.timeoutRef) {
      this.intervalClear(this.timeoutRef);
      this.timeoutRef = undefined;
    }
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
