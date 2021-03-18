import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { Emitter } from "../Emitter";
import { PluginEvents } from "../plugins/PluginManager";
import { Runner } from "../testRunner";

/** Closes the server when all the tests complete */
export class CloseServerWhenTestsComplete implements IvrTesterPlugin {
  private testRunner: Runner;
  private totalRunning = 0;
  private totalSuccessful = 0;
  private totalFailed = 0;

  public initialise(eventEmitter: Emitter<PluginEvents>, runner: Runner): void {
    eventEmitter.on("callServerStarted", ({ callServer }) => {
      this.testRunner = runner;

      callServer.on("testStarted", ({ testSession }) => {
        this.testStarted();

        testSession.callFlowSession.on(
          "allPromptsMatched",
          this.testSuccessful.bind(this)
        );
        testSession.callFlowSession.on(
          "timeoutWaitingForMatch",
          this.testFailed.bind(this)
        );
      });
    });
  }

  private testStarted(): void {
    this.totalRunning++;
  }

  private testSuccessful(): void {
    this.totalSuccessful++;
    this.testCompleted();
  }

  private testFailed(): void {
    this.totalFailed++;
    this.testCompleted();
  }

  private testCompleted(): void {
    const totalCompletedTests = this.totalSuccessful + this.totalFailed;

    const allTestsCompleted = totalCompletedTests >= this.totalRunning;
    if (this.testRunner && allTestsCompleted) {
      const failed = this.totalFailed > 0;
      this.testRunner.stop(failed);
    }
  }
}
