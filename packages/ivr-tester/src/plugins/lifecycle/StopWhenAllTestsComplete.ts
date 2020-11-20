import { LifecycleHookPlugin } from "./LifecycleHookPlugin";
import { Server } from "ws";
import { CallHandlingServerStartedEvent } from "./SetupEvents";
import { LifecycleEventEmitter } from "./LifecycleEventEmitter";

export class StopWhenAllTestsComplete implements LifecycleHookPlugin {
  private static readonly PluginName = "StopWhenAllTestsComplete";
  private server: Server;
  private totalTests = 0;
  private testsCompleted = 0;

  name(): string {
    return StopWhenAllTestsComplete.PluginName;
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
    if (this.testsCompleted >= this.totalTests) {
      this.server.close();
    }
  }
}
