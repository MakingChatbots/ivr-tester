import { IvrTesterPlugin } from "./IvrTesterPlugin";
import { CallServerAbc } from "../testing/CallServer";
import { TypedEmitter } from "../Emitter";
import { RequestedCall } from "../call/Caller";

export interface CallRequestedEvent {
  requestedCall: RequestedCall;
  total: number;
}

export interface CallRequestErroredEvent {
  error: Error;
}

export interface CallServerStartedEvent {
  callServer: CallServerAbc;
}

export type PluginEvents = {
  callServerStarted: CallServerStartedEvent;
  callRequested: CallRequestedEvent;
  callRequestErrored: CallRequestErroredEvent;
};

/** @internal */
export class PluginManager extends TypedEmitter<PluginEvents> {
  constructor(private readonly plugins: IvrTesterPlugin[]) {
    super();
  }

  public initialise(): void {
    for (const plugin of this.plugins) {
      plugin.initialise(this);
    }
  }

  public serverListening(callServer: CallServerAbc): void {
    this.emit("callServerStarted", { callServer });
  }

  public callRequested(requestedCall: RequestedCall, total: number): void {
    this.emit("callRequested", {
      requestedCall,
      total,
    });
  }

  public callRequestErrored(error: Error): void {
    this.emit("callRequestErrored", { error });
  }
}
