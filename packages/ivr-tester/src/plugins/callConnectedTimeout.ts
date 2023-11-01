import { IvrTesterPlugin } from "./IvrTesterPlugin";
import { Config } from "../configuration/Config";
import { IvrTesterExecution, IvrTesterLifecycleEvents } from "../IvrTester";
import { Emitter } from "../Emitter";

export const callConnectedTimeout = (
  emitter: Emitter<IvrTesterLifecycleEvents>
): IvrTesterPlugin => ({
  initialise(
    { msTimeoutWaitingForCall }: Config,
    ivrTesterExecution: IvrTesterExecution
  ) {
    const { lifecycleEvents } = ivrTesterExecution;

    let timeoutCallbackId: NodeJS.Timeout;

    lifecycleEvents.on("callRequested", () => {
      clearTimeout(timeoutCallbackId);
      timeoutCallbackId = setTimeout(() => {
        emitter.emit("callConnectingTimeout", {
          msWaitingForCall: msTimeoutWaitingForCall,
        });

        ivrTesterExecution.stop({
          dueToFailure: true,
          reason: `call did not connect after ${
            msTimeoutWaitingForCall / 1000
          }s`,
        });
      }, msTimeoutWaitingForCall);
    });

    lifecycleEvents.on("callServerStopped", () =>
      clearTimeout(timeoutCallbackId)
    );
    lifecycleEvents.on("callConnected", () => clearTimeout(timeoutCallbackId));
  },
});
