import { IvrTesterPlugin } from "./IvrTesterPlugin";
import { CallServer, CallServerEvents } from "../testing/TwilioCallServer";
import { Emitter, TypedEmitter } from "../Emitter";
import { RequestedCall } from "../call/Caller";
import { Runner } from "../testRunner";

export interface CallRequestedEvent {
  requestedCall: RequestedCall;
  total: number;
}

export interface CallRequestErroredEvent {
  error: Error;
}

export interface CallServerStartedEvent {
  callServer: Emitter<CallServerEvents>;
}

export type PluginEvents = {
  callServerStarted: CallServerStartedEvent;
  callRequested: CallRequestedEvent;
  callRequestErrored: CallRequestErroredEvent;
};

export class PluginManager extends TypedEmitter<PluginEvents> {
  constructor(private readonly plugins: IvrTesterPlugin[]) {
    super();
  }

  public initialise(runner: Runner): void {
    for (const plugin of this.plugins) {
      plugin.initialise(this, runner);
    }
  }

  public serverListening(callServer: CallServer): void {
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
