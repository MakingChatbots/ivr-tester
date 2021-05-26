import { IvrTesterPlugin } from "../../plugins/IvrTesterPlugin";
import chalk from "chalk";
import { CallServerEvents } from "../TwilioCallServer";
import { Emitter } from "../../Emitter";
import { PluginHost } from "../../plugins/PluginManager";
import { TestSession } from "../../testRunner";

const ivrTranscription = (
  callServer: Emitter<CallServerEvents>,
  testSession: TestSession
): void => {
  let includeTestName = false;

  let totalTests = 0;
  callServer.on("testStarted", () => {
    totalTests++;
    if (totalTests >= 2) {
      includeTestName = true;
    }
  });

  testSession.callFlowSession.on("progress", (event) => {
    const state = chalk.gray.bold("Transcribing: ");

    const testName = includeTestName ? `${testSession.scenario.name}: ` : "";
    console.log(state + chalk.gray(`${testName}${event.transcription}`));
  });
};

const ivrTestPassed = (testSession: TestSession): void =>
  testSession.callFlowSession.on("allPromptsMatched", () =>
    console.log(chalk.green(`Test Complete: ${testSession.scenario.name}...`))
  );

const ivrTestFailed = (testSession: TestSession): void =>
  testSession.callFlowSession.on("timeoutWaitingForMatch", (event) => {
    console.log(
      `${chalk.bold.blue("Test -")} ${chalk.bold.blue(
        testSession.scenario.name
      )}\n`,
      `Them: "${event.transcription}"\n`,
      chalk.red("Timed out waiting for prompt to complete\n")
    );
    console.log(chalk.bold.red(`Test Failed`));
  });

const callConnected = (callServer: Emitter<CallServerEvents>): void => {
  callServer.on("callConnected", () => {
    console.log("Call connected");
  });
};

const callServerListening = (callServer: Emitter<CallServerEvents>): void => {
  callServer.on("listening", ({ localUrl }) => {
    console.log(
      `Server is listening on ${localUrl.port} for the stream for the call`
    );
  });
};

const callServerStopped = (callServer: Emitter<CallServerEvents>): void => {
  callServer.on("stopped", () => console.log("The server has closed"));
};

const callServerErrored = (callServer: Emitter<CallServerEvents>): void => {
  callServer.on("error", (event) =>
    console.error("Server experienced an error", event.error.message)
  );
};

const callRequested = (emitter: PluginHost): void =>
  emitter.on("callRequested", (event) => {
    switch (event.requestedCall.type) {
      case "audio-playback":
        console.log("Playing back audio to simulate call");
        break;
      case "telephony":
        console.log(`Calling ${event.requestedCall.call.to}...`);
        break;
    }
  });

const callRequestErrored = (emitter: PluginHost): void =>
  emitter.on("callRequestErrored", (event) =>
    console.error(`Call failed`, event.error.message)
  );

const ivrTestConditionMet = (
  callServer: Emitter<CallServerEvents>,
  testSession: TestSession
): void => {
  let includeTestName = false;

  let totalTests = 0;
  callServer.on("testStarted", () => {
    totalTests++;
    if (totalTests >= 2) {
      includeTestName = true;
    }
  });

  testSession.callFlowSession.on("promptMatched", (event) => {
    const lines: string[] = [];

    if (includeTestName) {
      lines.push(`Test - ${testSession.scenario.name}`);
    }
    lines.push(`Them: "${event.transcription}"`);
    lines.push(`You: ${event.promptDefinition.then.describe()}`);

    console.log(chalk.bold.blue(lines.join(`\n`)));
  });
};

const callServerStarted = (eventEmitter: PluginHost) => {
  eventEmitter.on("callServerStarted", ({ callServer }) => {
    callConnected(callServer);
    callServerListening(callServer);
    callServerStopped(callServer);
    callServerErrored(callServer);

    callServer.on("testStarted", ({ testSession }) => {
      console.log(`Call using test '${testSession.scenario.name}'`);
      ivrTestPassed(testSession);
      ivrTestFailed(testSession);
      ivrTestConditionMet(callServer, testSession);
      ivrTranscription(callServer, testSession);
    });
  });
};

const testAborting = (eventEmitter: PluginHost) => {
  eventEmitter.on("testsAborting", ({ reason }) => {
    console.log(chalk.bold.red(`Timed out: ${reason}`));
  });
};

export const consoleUserInterface = (): IvrTesterPlugin => ({
  initialise(eventEmitter: PluginHost): void {
    callServerStarted(eventEmitter);
    callRequested(eventEmitter);
    callRequestErrored(eventEmitter);
    testAborting(eventEmitter);
  },
});
