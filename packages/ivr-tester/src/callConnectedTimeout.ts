import { IvrTesterPlugin } from "./plugins/IvrTesterPlugin";
import { Config } from "./configuration/Config";
import { IvrTesterExecution } from "./IvrTester";

export const callConnectedTimeout = (): IvrTesterPlugin => ({
  initialise(
    { msTimeoutWaitingForCall }: Config,
    ivrTesterExecution: IvrTesterExecution
  ) {
    const { lifecycleEvents } = ivrTesterExecution;

    let timeoutCallbackId: NodeJS.Timeout;

    lifecycleEvents.on("callRequested", () => {
      clearTimeout(timeoutCallbackId);
      timeoutCallbackId = setTimeout(() => {
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
