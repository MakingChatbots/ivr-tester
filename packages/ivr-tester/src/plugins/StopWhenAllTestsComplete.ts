import { IvrTesterPlugin } from "./IvrTesterPlugin";
import { CallAssignedTestEvent } from "./events/TestEvents";
import { Server } from "ws";
import { CallHandlingServerStartedEvent } from "./events/SetupEvents";
import {LifecycleEventEmitter} from "./events/LifecycleEventEmitter";

export class StopWhenAllTestsComplete implements IvrTesterPlugin {
  private server: Server;
  private totalTests: number = 0;
  private testsCompleted: number = 0;

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

  private callAssignedTest(event: CallAssignedTestEvent): void {
    this.totalTests++;
  }

  private testCompleted(): void {
    this.testsCompleted++;
    if (this.testsCompleted >= this.totalTests) {
      this.server.close();
    }
  }
}
