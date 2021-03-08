import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { Emitter } from "../Emitter";
import { PluginEvents } from "../plugins/PluginManager";
import { CallServer } from "./TwilioCallServer";

/** Closes the server when all the tests complete */
export class CloseServerWhenTestsComplete implements IvrTesterPlugin {
  private server: CallServer;
  private totalTests = 0;
  private testsCompleted = 0;

  public initialise(eventEmitter: Emitter<PluginEvents>): void {
    eventEmitter.on("callServerStarted", ({ callServer }) => {
      this.callHandlingServerStarted(callServer);

      callServer.on("testStarted", ({ testSession }) => {
        this.testStarted();

        testSession.callFlowSession.on(
          "allPromptsMatched",
          this.testCompleted.bind(this)
        );
        testSession.callFlowSession.on(
          "timeoutWaitingForMatch",
          this.testCompleted.bind(this)
        );
      });
    });
  }

  private callHandlingServerStarted(callServer: CallServer): void {
    this.server = callServer;
  }

  private testStarted(): void {
    this.totalTests++;
  }

  private testCompleted(): void {
    this.testsCompleted++;

    const allTestsCompleted = this.testsCompleted >= this.totalTests;
    if (this.server && allTestsCompleted) {
      this.server.stop();
    }
  }
}
