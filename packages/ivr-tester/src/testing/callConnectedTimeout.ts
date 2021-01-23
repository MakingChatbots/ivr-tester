import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { Emitter } from "../Emitter";
import { PluginEvents } from "../plugins/PluginManager";
import { ConsoleLoggerPlugin } from "./reporting/consoleUserInterface";
import { Config } from "../configuration/Config";

export const callConnectedTimeout = (
  { msTimeoutWaitingForCall }: Config,
  consoleLoggerPlugin: ConsoleLoggerPlugin
): IvrTesterPlugin => ({
  initialise(eventEmitter: Emitter<PluginEvents>) {
    eventEmitter.on("callServerStarted", ({ callServer }) => {
      let timeoutCallbackId: NodeJS.Timeout;

      eventEmitter.on("callRequested", () => {
        clearTimeout(timeoutCallbackId);
        timeoutCallbackId = setTimeout(() => {
          callServer.stop();
          consoleLoggerPlugin.timedOut(
            `call did not connect after ${msTimeoutWaitingForCall / 1000}s`
          );
        }, msTimeoutWaitingForCall);
      });

      callServer.on("stopped", () => clearTimeout(timeoutCallbackId));
      callServer.on("callConnected", () => clearTimeout(timeoutCallbackId));
    });
  },
});
