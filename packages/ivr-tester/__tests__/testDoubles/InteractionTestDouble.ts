import {
  Call,
  IvrCallFlowInteraction,
  IvrCallFlowInteractionEvents,
  IvrTesterExecution,
  IvrTesterPlugin,
  ReadonlyIvrTesterLifecycle,
  StopParams,
  TypedEmitter,
} from "../../src";

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
    this.setupDebugLogs(this.ivrTesterExecution.lifecycleEvents);
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

  public shutdown(): void {
    // Intentionally empty
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
}
