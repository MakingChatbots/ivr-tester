import type { Config } from "../configuration/Config";
import type { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import type { PluginHost } from "../plugins/PluginManager";

export const callConnectedTimeout = ({
  msTimeoutWaitingForCall,
}: Config): IvrTesterPlugin => ({
  initialise(pluginHost: PluginHost) {
    pluginHost.on("callServerStarted", ({ callServer }) => {
      let timeoutCallbackId: NodeJS.Timeout;

      pluginHost.on("callRequested", () => {
        clearTimeout(timeoutCallbackId);
        timeoutCallbackId = setTimeout(() => {
          pluginHost.abortTests(
            `call did not connect after ${msTimeoutWaitingForCall / 1000}s`,
          );
        }, msTimeoutWaitingForCall);
      });

      callServer.on("stopped", () => clearTimeout(timeoutCallbackId));
      callServer.on("callConnected", () => clearTimeout(timeoutCallbackId));
    });
  },
});
