import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { Emitter } from "../Emitter";
import { PluginEvents } from "../plugins/PluginManager";
import { ConsoleLoggerPlugin } from "./reporting/consoleUserInterface";

export const callConnectedTimeout = (
  timeoutInMs: number,
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
            `call did not connect after ${timeoutInMs / 1000}s`
          );
        }, timeoutInMs);
      });

      callServer.on("stopped", () => clearTimeout(timeoutCallbackId));
      callServer.on("callConnected", () => clearTimeout(timeoutCallbackId));
    });
  },
});
