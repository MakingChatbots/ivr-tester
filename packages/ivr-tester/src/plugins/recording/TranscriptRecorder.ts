import * as fs from "fs";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import * as path from "path";
import { FilenameFactory } from "./filename/FilenameFactory";
import { dateAndPhoneNumberFilename } from "./filename/dateAndPhoneNumberFilename";
import { Config } from "../../configuration/Config";
import { ConfigurationError } from "../../configuration/ConfigurationError";
import { IvrTesterPlugin } from "../IvrTesterPlugin";
import {
  IvrCallFlowInteractionEvents,
  IvrCallFlowInteractionPromptEvent,
  IvrTesterExecution,
} from "../../IvrTester";
import { Emitter } from "../../Emitter";
import { Call, CallMediaStreamStarted } from "../../call/Call";

export interface RecorderConfig {
  outputPath: string;
  filename?: string | FilenameFactory;
  includeResponse: boolean;
}

export class TranscriptRecorder {
  private static readonly FILE_EXT = "txt";
  private static readonly FILENAME_SUFFIX = "transcript";

  private readonly createFileRef: (event: CallMediaStreamStarted) => void;
  private readonly savePromptRef: (
    event: IvrCallFlowInteractionPromptEvent
  ) => void;
  private readonly closeRef: () => void;

  private writeStream: WriteStream;

  constructor(
    private readonly call: Call,
    private readonly ivrCallFlowInteractionEvents: Emitter<IvrCallFlowInteractionEvents>,
    private readonly config: RecorderConfig
  ) {
    this.createFileRef = this.createFile.bind(this);
    call.on("callMediaStreamStarted", this.createFileRef);

    this.savePromptRef = this.savePrompt.bind(this);
    ivrCallFlowInteractionEvents.on("prompt", this.savePromptRef);

    // FIXME This is going to cause a problem miss the last prompt, since it will close the call before emitting the event. But I should look to fix this by emitting the prompt event before taking closing the call
    this.closeRef = this.close.bind(this);
    call.on("callClosed", this.closeRef);
  }

  // private saveTimedOutPromptThenClose(event: TimeoutWaitingForMatchEvent) {
  //   const prompt = [];
  //   if (this.config.includeResponse) {
  //     prompt.push(`Them: ${event.transcription}`);
  //     prompt.push(
  //       "You: Ended test as prompt did not match condition within timeout period"
  //     );
  //   } else {
  //     prompt.push(`${event.transcription}`);
  //   }
  //
  //   this.writeStream.write(`${prompt.join("\n")}\n\n`);
  //
  //   this.close();
  // }

  private savePrompt(event: IvrCallFlowInteractionPromptEvent) {
    if (event.call !== this.call) {
      return;
    }

    const prompt = [];
    if (this.config.includeResponse) {
      prompt.push(`Them: ${event.transcription}`);
      prompt.push(`You: ${event.responseDescription}`);
    } else {
      prompt.push(`${event.transcription}`);
    }

    this.writeStream.write(`${prompt.join("\n")}\n\n`);
  }

  private createFilename(event: CallMediaStreamStarted): string {
    let filename: string;

    if (typeof this.config.filename === "string") {
      filename = this.config.filename;
    } else if (typeof this.config.filename === "function") {
      filename = this.config.filename(
        {
          sid: event.streamSid,
          call: { from: event.fromNumber, to: event.toNumber },
        },
        TranscriptRecorder.FILENAME_SUFFIX
      );
    }

    return `${filename}.${TranscriptRecorder.FILE_EXT}`;
  }

  private createFile(event: CallMediaStreamStarted): void {
    const filename = this.createFilename(event);
    const filepath = path.join(this.config.outputPath, filename);

    console.log(`Recording transcript to '${filepath}'`);
    mkdirSync(this.config.outputPath, { recursive: true });

    this.writeStream = createWriteStream(filepath);
  }

  private close() {
    this.call.off("callMediaStreamStarted", this.createFileRef);
    this.call.off("callClosed", this.closeRef);

    this.ivrCallFlowInteractionEvents.off("prompt", this.savePromptRef);

    this.writeStream.close();
    this.writeStream = null;
  }
}

export const transcriptRecorderPlugin = (
  ivrCallFlowInteractionEvents: Emitter<IvrCallFlowInteractionEvents>
): IvrTesterPlugin => ({
  initialise(config: Config, ivrTesterExecution: IvrTesterExecution) {
    if (!config.recording?.transcript) {
      return; // Nothing to do
    }

    const recorderConfig: RecorderConfig = {
      outputPath: config.recording?.transcript?.outputPath,
      filename:
        config.recording?.transcript?.filename || dateAndPhoneNumberFilename,
      includeResponse: config.recording?.transcript?.includeResponse ?? false,
    };

    if (!recorderConfig.outputPath) {
      throw new ConfigurationError(
        "recording.transcript.outputPath",
        "Path must be defined"
      );
    }

    if (!fs.existsSync(recorderConfig.outputPath)) {
      throw new ConfigurationError(
        "recording.transcript.outputPath",
        "Path does not exist"
      );
    }

    ivrTesterExecution.lifecycleEvents.on("callConnected", ({ call }) => {
      new TranscriptRecorder(
        call,
        ivrCallFlowInteractionEvents,
        recorderConfig
      );
    });
  },
});
