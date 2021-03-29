import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { PluginHost } from "../plugins/PluginManager";
import { Config } from "../configuration/Config";

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
            `call did not connect after ${msTimeoutWaitingForCall / 1000}s`
          );
        }, msTimeoutWaitingForCall);
      });

      callServer.on("stopped", () => clearTimeout(timeoutCallbackId));
      callServer.on("callConnected", () => clearTimeout(timeoutCallbackId));
    });
  },
});
