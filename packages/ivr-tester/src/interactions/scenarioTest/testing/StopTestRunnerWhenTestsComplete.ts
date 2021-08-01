import { IvrTesterPlugin } from "../../../plugins/IvrTesterPlugin";
import { IvrTesterLifecycle } from "../../../plugins/PluginManager";
import { IvrTester, TestSession } from "../../../IvrTester";

/** Stops the test run when all the tests complete */
export class StopTestRunnerWhenTestsComplete implements IvrTesterPlugin {
  private testRunner: IvrTester;
  private totalRunning = 0;
  private totalSuccessful = 0;
  private totalFailed = 0;

  public initialise(_: IvrTesterLifecycle, testRunner: IvrTester): void {
    this.testRunner = testRunner;
  }

  public testStarted(testSession: TestSession): void {
    this.totalRunning++;
    testSession.callFlowTestSession.on(
      "allPromptsMatched",
      this.testSuccessful.bind(this)
    );
    testSession.callFlowTestSession.on(
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
