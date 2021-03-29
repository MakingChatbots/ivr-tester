import { IvrTesterPlugin } from "../plugins/IvrTesterPlugin";
import { PluginHost } from "../plugins/PluginManager";
import { TestRunner, TestSession } from "../testRunner";

/** Stops the test run when all the tests complete */
export class StopTestRunnerWhenTestsComplete implements IvrTesterPlugin {
  private testRunner: TestRunner;
  private totalRunning = 0;
  private totalSuccessful = 0;
  private totalFailed = 0;

  public initialise(_: PluginHost, testRunner: TestRunner): void {
    this.testRunner = testRunner;
  }

  public testStarted(testSession: TestSession): void {
    this.totalRunning++;
    testSession.callFlowSession.on(
      "allPromptsMatched",
      this.testSuccessful.bind(this)
    );
    testSession.callFlowSession.on(
      "timeoutWaitingForMatch",
      this.testFailed.bind(this)
    );
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
