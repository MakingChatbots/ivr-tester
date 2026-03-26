import { ReadonlyIvrTesterLifecycle } from "../IvrTester";
import chalk from "chalk";
import { Ui } from "../interactions/Ui";
import { IvrTesterPlugin } from "./IvrTesterPlugin";

function callConnected(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callConnected", () => console.log("Call connected"));
}

function callDisconnected(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callDisconnected", () =>
    console.log("Call disconnected")
  );
}

function callServerListening(
  lifecycleEvents: ReadonlyIvrTesterLifecycle
): void {
  lifecycleEvents.on("callServerListening", ({ localUrl }) => {
    console.log(`Listening for calls to be connected on port ${localUrl}`);
  });
}

function callRequested(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callRequested", (event) => {
    switch (event.requestedCall.type) {
      case "audio-playback":
        console.log("Playing back audio to simulate call");
        break;
      case "telephony":
        console.log(`Calling ${event.requestedCall.call.to}...`);
        break;
    }
  });
}
function callErrored(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callErrored", ({ error }) => {
    chalk.bold.red("Error with call", error.message);
  });
}

function callRequestErrored(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callRequestErrored", ({ error }) =>
    chalk.bold.red("Call failed", error.message)
  );
}

function callServerErrored(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callServerErrored", (event) =>
    chalk.bold.red("Call server experienced an error", event.error.message)
  );
}

function callServerStopped(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("callServerStopped", () =>
    console.error("Call server stopped")
  );
}

function callConnectingTimeout(
  lifecycleEvents: ReadonlyIvrTesterLifecycle
): void {
  lifecycleEvents.on("callConnectingTimeout", (event) => {
    console.log(
      chalk.bold.red(
        `Call did not connect after ${event.msWaitingForCall / 1000} seconds`
      )
    );
  });
}

function mediaRecorders(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("inboundAudioRecordingStarted", ({ outputPath }) => {
    console.log(`Recording inbound audio to '${outputPath}'`);
  });
  lifecycleEvents.on("transcriptRecordingStarted", ({ outputPath }) => {
    console.log(`Recording transcript to '${outputPath}'`);
  });
}

function ivrTesterAborted(lifecycleEvents: ReadonlyIvrTesterLifecycle): void {
  lifecycleEvents.on("ivrTesterAborted", (event) => {
    if (event.dueToFailure) {
      let outputMessage = "IVR Tester was aborted due to a failure";
      if (event.reason) {
        outputMessage = `IVR Tester was aborted due to failure '${event.reason}'`;
      }

      console.log(chalk.bold.red(outputMessage));
    } else {
      let outputMessage = "IVR Tester was aborted";
      if (event.reason) {
        outputMessage = `IVR Tester was aborted because '${event.reason}'`;
      }
      console.log(outputMessage);
    }
  });
}

export function consoleUserInterface(): IvrTesterPlugin & Ui {
  return {
    initialise(_, execution): void {
      const { lifecycleEvents } = execution;

      callServerListening(lifecycleEvents);

      callRequested(lifecycleEvents);
      callRequestErrored(lifecycleEvents);

      callConnected(lifecycleEvents);
      callDisconnected(lifecycleEvents);
      callErrored(lifecycleEvents);
      callServerErrored(lifecycleEvents);
      callServerStopped(lifecycleEvents);
      callConnectingTimeout(lifecycleEvents);

      mediaRecorders(lifecycleEvents);
      ivrTesterAborted(lifecycleEvents);
    },
    reportProgressUpdate(message: string) {
      console.info(message);
    },
    reportError(errorMessage: string) {
      console.log(chalk.bold.red(errorMessage));
    },
  };
}
