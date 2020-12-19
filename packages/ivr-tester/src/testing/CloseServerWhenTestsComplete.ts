import { LifecycleHookPlugin } from "../plugins/lifecycle/LifecycleHookPlugin";
import { Server } from "ws";
import { CallHandlingServerStartedEvent } from "../plugins/lifecycle/SetupEvents";
import { LifecycleEventEmitter } from "../plugins/lifecycle/LifecycleEventEmitter";

/** Closes the server when all the tests complete */
export class CloseServerWhenTestsComplete implements LifecycleHookPlugin {
  private static readonly PluginName = "StopWhenAllTestsComplete";
  private server: Server;
  private totalTests = 0;
  private testsCompleted = 0;

  public name(): string {
    return CloseServerWhenTestsComplete.PluginName;
  }

  public initialise(eventEmitter: LifecycleEventEmitter): void {
    eventEmitter.on("ivrTestPassed", this.testCompleted.bind(this));
    eventEmitter.on("ivrTestFailed", this.testCompleted.bind(this));
    eventEmitter.on("callAssignedTest", this.callAssignedTest.bind(this));
    eventEmitter.on(
      "callHandlingServerStarted",
      this.callHandlingServerStarted.bind(this)
    );
  }

  private callHandlingServerStarted({
    server,
  }: CallHandlingServerStartedEvent): void {
    this.server = server;
  }

  private callAssignedTest(): void {
    this.totalTests++;
  }

  private testCompleted(): void {
    this.testsCompleted++;

    const allTestsCompleted = this.testsCompleted >= this.totalTests;
    if (this.server && allTestsCompleted) {
      this.server.close();
    }
  }
}
