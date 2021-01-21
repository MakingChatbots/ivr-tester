import { IvrTesterPlugin } from "../../plugins/IvrTesterPlugin";
import chalk from "chalk";
import logSymbols from "log-symbols";
import { TestInstance } from "../../handlers/TestInstanceClass";
import { CallServer, CallServerAbc } from "../CallServer";
import { Emitter } from "../../Emitter";
import { PluginEvents } from "../../plugins/PluginManager";

const ivrTranscription = (testInstance: TestInstance): void =>
  testInstance.on("progress", (event) => {
    const state = chalk.blue.bold(
      event.transcription.isFinal ? "Finished: " : "Transcribing: "
    );

    console.log(
      state +
        chalk.blue(`${event.test.name}: ${event.transcription.transcription}`)
    );
  });

const ivrTestPassed = (emitter: TestInstance): void =>
  emitter.on("testPassed", (event) =>
    console.log(
      logSymbols.success,
      chalk.green(`Test Complete: ${event.test.name}...`)
    )
  );

const ivrTestFailed = (testInstance: TestInstance): void =>
  testInstance.on("testFailed", (event) => {
    console.log(
      `${chalk.bold.blue("Test -")} ${chalk.bold.blue(event.test.name)}\n`,
      `Them: "${event.transcription}"\n`,
      chalk.red("No condition matched this transcript\n")
    );
    console.log(logSymbols.error, chalk.bold.red(`Test Failed`));
  });

const callConnected = (callServer: CallServerAbc): void => {
  callServer.on("callConnected", () => {
    console.log("Call connected to the server");
  });
};

const callServerListening = (callServer: CallServerAbc): void => {
  callServer.on("listening", ({ localUrl }) => {
    // const { port } = localUrl.port.address() as AddressInfo;
    console.log(
      `Server is listening on ${localUrl.port} for the stream for the call`
    );
  });
};

const callServerStopped = (callServer: CallServerAbc): void => {
  callServer.on("stopped", () => console.log("The server has closed"));
};

const callServerErrored = (callServer: CallServerAbc): void => {
  callServer.on("error", (event) =>
    console.error("Server experienced an error", event.error.message)
  );
};

const callRequested = (emitter: Emitter<PluginEvents>): void =>
  emitter.on("callRequested", (event) => {
    switch (event.requestedCall.type) {
      case "audio-playback":
        console.log("Playing back audio to simulate call");
        break;
      case "telephony":
        console.log(`Told Twilio to call ${event.requestedCall.call.to}`);
        break;
    }
  });

const callRequestErrored = (emitter: Emitter<PluginEvents>): void =>
  emitter.on("callRequestErrored", (event) =>
    console.error("Twilio failed to make the call...", event.error.message)
  );

const ivrTestConditionMet = (testInstance: TestInstance): void =>
  testInstance.on("conditionMet", (event) =>
    console.log(
      `${chalk.bold.blue("Test -")} ${chalk.bold.blue(event.test.name)}\n`,
      `Them: "${event.transcription}"\n`,
      `You: ${event.condition.then.describe()}\n`
    )
  );

const callServerStarted = (eventEmitter: Emitter<PluginEvents>) => {
  eventEmitter.on("callServerStarted", ({ callServer }) => {
    callConnected(callServer);
    callServerListening(callServer);
    callServerStopped(callServer);
    callServerErrored(callServer);

    callServer.on("testStarted", ({ testInstance }) => {
      console.log(`Call using test '${testInstance.getTest().name}'`);
      ivrTestPassed(testInstance);
      ivrTestFailed(testInstance);
      ivrTestConditionMet(testInstance);
      ivrTranscription(testInstance);
    });
  });
};

export const consoleLogger: IvrTesterPlugin = {
  name: () => "ConsoleLogger",
  initialise(eventEmitter: Emitter<PluginEvents>): void {
    callServerStarted(eventEmitter);
    callRequested(eventEmitter);
    callRequestErrored(eventEmitter);
  },
};
