import * as fs from "fs";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import * as path from "path";
import { WebSocketEvents } from "../../call/TwilioCall";
import { TwilioConnectionEvents } from "../../call/twilio";
import { FilenameFactory } from "./filename/FilenameFactory";
import { dateAndPhoneNumberFilename } from "./filename/dateAndPhoneNumberFilename";
import { Config } from "../../configuration/Config";
import { ConfigurationError } from "../../configuration/ConfigurationError";
import { IvrTesterPlugin } from "../IvrTesterPlugin";
import { IvrTesterExecution } from "../../IvrTester";
import { Call, CallMediaStreamStarted } from "../../call/Call";

export interface RecorderConfig {
  outputPath: string;
  filename?: string | FilenameFactory;
}

// TODO Determine how to set the filename during the recording, and writeup in documentation in this file
// I've created a description field on the call which could be set by an interaction
/**
 * Starts recording the call as soon as it connects. At this point the description for the
 * recording's filename (e.g. the test that has been assigned to the call) might not be known
 * so calls are streamed to a temporary file.
 *
 * * Test Interaction - The test is assigned after the call is connected
 * * Exploratory Interaction - The description of the route taken is only possible after the test
 * *
 */
export const mediaStreamRecorderPlugin = (): IvrTesterPlugin => ({
  initialise(config: Config, { lifecycleEvents }: IvrTesterExecution) {
    if (!config.recording?.audio) {
      return; // Nothing to do
    }

    const recorderConfig: RecorderConfig = {
      outputPath: config.recording?.audio?.outputPath,
      filename: config.recording?.audio?.filename || dateAndPhoneNumberFilename,
    };

    if (!recorderConfig.outputPath) {
      throw new ConfigurationError(
        "recording.audio.outputPath",
        "Path must be defined"
      );
    }

    if (!fs.existsSync(recorderConfig.outputPath)) {
      throw new ConfigurationError(
        "recording.audio.outputPath",
        "Path does not exist"
      );
    }

    lifecycleEvents.on("callConnected", ({ call }) => {
      new MediaStreamRecorder(call, recorderConfig);
    });
  },
});

export class MediaStreamRecorder {
  private static readonly FILE_EXT = "raw";

  private writeStream: WriteStream;
  private readonly writeMediaToFileRef: (message: string) => void;
  private readonly createFileRef: (event: CallMediaStreamStarted) => void;
  private readonly closeRef: () => void;

  constructor(
    private readonly call: Call,
    private readonly config: RecorderConfig
  ) {
    this.createFileRef = this.createFile.bind(this);
    call.on("callMediaStreamStarted", this.createFileRef);

    this.writeMediaToFileRef = this.writeMediaToFile.bind(this);
    this.closeRef = this.close.bind(this);

    const connection = this.call.getStream();
    connection
      .on(WebSocketEvents.Message, this.writeMediaToFileRef)
      .on(WebSocketEvents.Close, this.closeRef);
  }

  private writeMediaToFile(message: string) {
    const data = JSON.parse(message);
    switch (data.event) {
      case TwilioConnectionEvents.Media:
        this.writeToFile(Buffer.from(data.media.payload, "base64"));
        break;
    }
  }

  private createFilename(event: CallMediaStreamStarted): string {
    let filename: string;

    if (typeof this.config.filename === "string") {
      filename = this.config.filename;
    } else if (typeof this.config.filename === "function") {
      filename = this.config.filename({
        sid: event.streamSid,
        call: { from: event.fromNumber, to: event.toNumber },
      });
    }

    return `${filename}.${MediaStreamRecorder.FILE_EXT}`;
  }

  private createFile(event: CallMediaStreamStarted): void {
    const filename = this.createFilename(event);
    const filepath = path.join(this.config.outputPath, filename);

    console.log(`Recording inbound audio to '${filepath}'`);
    mkdirSync(this.config.outputPath, { recursive: true });
    // FIXME What if recordings for multiple calls created in quick succession? Chance of filename being the same?
    this.writeStream = createWriteStream(filepath);
  }

  private writeToFile(data: Buffer): void {
    this.writeStream.write(data);
  }

  private close() {
    this.call.off("callMediaStreamStarted", this.createFileRef);

    const connection = this.call.getStream();
    connection
      .off(WebSocketEvents.Message, this.writeMediaToFileRef)
      .off(WebSocketEvents.Close, this.closeRef);

    this.writeStream.close();
    this.writeStream = null;
  }
}
