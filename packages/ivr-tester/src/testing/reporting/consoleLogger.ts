import { LifecycleHookPlugin } from "../../plugins/lifecycle/LifecycleHookPlugin";
import { AddressInfo } from "ws";
import chalk from "chalk";
import logSymbols from "log-symbols";
import { LifecycleEventEmitter } from "../../plugins/lifecycle/LifecycleEventEmitter";

const ivrTestPassed = (emitter: LifecycleEventEmitter): void =>
  emitter.on("ivrTestPassed", (event) =>
    console.log(
      logSymbols.success,
      chalk.green(`Test Complete: ${event.test.name}`)
    )
  );

const ivrTestFailed = (emitter: LifecycleEventEmitter): void =>
  emitter.on("ivrTestFailed", (event) => {
    console.log(
      `${chalk.bold.blue("Test -")} ${chalk.bold.blue(event.test.name)}\n`,
      `Them: "${event.transcription}"\n`,
      chalk.red("No condition matched this transcript\n")
    );
    console.log(logSymbols.error, chalk.bold.red(`Test Failed`));
  });

const callConnected = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callConnected", () =>
    console.log("Call connected to the server")
  );

const callAssignedTest = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callAssignedTest", (event) =>
    console.log(`Call using test '${event.test.name}'`)
  );

const callHandlingServerStarted = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callHandlingServerStarted", ({ server }) => {
    const { port } = server.address() as AddressInfo;
    console.log(`Server is listening on ${port} for the stream for the call`);
  });

const callHandlingServerStopped = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callHandlingServerStopped", () =>
    console.log("The server has closed")
  );

const callHandlingServerErrored = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callHandlingServerErrored", (event) =>
    console.error("Server experienced an error", event.error.message)
  );

const callRequested = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callRequested", (event) =>
    console.log(
      `Telling Twilio call ${event.call.to} (${event.current} of ${event.total})`
    )
  );

const callRequestErrored = (emitter: LifecycleEventEmitter): void =>
  emitter.on("callRequestErrored", (event) =>
    console.error("Twilio failed to make the call...", event.error.message)
  );

const ivrTestConditionMet = (emitter: LifecycleEventEmitter): void =>
  emitter.on("ivrTestConditionMet", (event) =>
    console.log(
      `${chalk.bold.blue("Test -")} ${chalk.bold.blue(event.test.name)}\n`,
      `Them: "${event.transcription}"\n`,
      `You: ${event.condition.then.describe()}\n`
    )
  );

const pluginName = "ConsoleLogger";
export const consoleLogger: LifecycleHookPlugin = {
  name: () => pluginName,
  initialise(eventEmitter: LifecycleEventEmitter): void {
    ivrTestPassed(eventEmitter);
    ivrTestFailed(eventEmitter);
    callConnected(eventEmitter);
    callAssignedTest(eventEmitter);
    callHandlingServerStarted(eventEmitter);
    callHandlingServerStopped(eventEmitter);
    callHandlingServerErrored(eventEmitter);
    callRequested(eventEmitter);
    callRequestErrored(eventEmitter);
    ivrTestConditionMet(eventEmitter);
  },
};
