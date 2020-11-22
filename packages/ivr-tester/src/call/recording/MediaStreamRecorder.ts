import ws from "ws";
import * as fs from "fs";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import * as path from "path";
import { WebSocketEvents } from "../TwilioCall";
import { TwilioConnectionEvents } from "../twilio";
import { IvrTest } from "../../handlers/TestHandler";
import { FilenameFactory } from "./filename/FilenameFactory";
import { filenameContainingIvrNumberAndTestName } from "./filename/filenameContainingIvrNumberAndTestName";
import { Config } from "../../configuration/Config";
import { ConfigurationError } from "../../configuration/ConfigurationError";
import { IvrCaller, TwilioMediaStreamStartEvent } from "../IvrCaller";

/**
 * Details about the stream about to be recorded
 */
export interface StreamDetails {
  sid: string;
  call: { from: string; to: string };
}

/** @internal */
export interface RecorderConfig {
  outputPath: string;
  filename?: string | FilenameFactory;
}

/** @internal */
export class MediaStreamRecorder {
  private static readonly FILE_EXT = "wav";

  private writeStream: WriteStream;
  private readonly onMessageFunc: (message: string) => void;
  private readonly onCloseFunc: () => void;

  constructor(
    private readonly connection: ws,
    private readonly test: IvrTest,
    private readonly config: RecorderConfig
  ) {
    this.onMessageFunc = this.processMessage.bind(this);
    this.onCloseFunc = this.close.bind(this);
    connection.on(WebSocketEvents.Message, this.onMessageFunc);
    connection.on(WebSocketEvents.Close, this.onCloseFunc);
  }

  public static createFromConfiguration(
    config: Config,
    connection: ws,
    test: IvrTest
  ): MediaStreamRecorder {
    const recorderConfig: RecorderConfig = {
      outputPath: config.recording?.outputPath,
      filename:
        config.recording?.filename || filenameContainingIvrNumberAndTestName,
    };

    if (!recorderConfig.outputPath) {
      throw new ConfigurationError(
        "recording.outputPath",
        "Path must be defined"
      );
    }

    if (!fs.existsSync(recorderConfig.outputPath)) {
      throw new ConfigurationError(
        "recording.outputPath",
        "Path does not exist"
      );
    }

    return new MediaStreamRecorder(connection, test, recorderConfig);
  }

  private processMessage(message: string) {
    const data = JSON.parse(message);
    switch (data.event) {
      case TwilioConnectionEvents.MediaStreamStart:
        this.createFile(data as TwilioMediaStreamStartEvent);
        break;
      case TwilioConnectionEvents.Media:
        this.writeToFile(Buffer.from(data.media.payload, "base64"));
        break;
      case TwilioConnectionEvents.CallEnded:
        this.close();
        console.log("Stopped recording");
        break;
    }
  }

  private createFilename(event: TwilioMediaStreamStartEvent): string {
    const call = IvrCaller.extractParameters(event);
    let filename: string;

    if (typeof this.config.filename === "string") {
      filename = this.config.filename;
    } else if (typeof this.config.filename === "function") {
      filename = this.config.filename(
        {
          sid: event.streamSid,
          call,
        },
        this.test
      );
    }

    return `${filename}.${MediaStreamRecorder.FILE_EXT}`;
  }

  private createFile(event: TwilioMediaStreamStartEvent): void {
    const filename = this.createFilename(event);
    const filepath = path.join(this.config.outputPath, filename);

    console.log(`Recording inbound stream to '${filepath}'`);
    mkdirSync(this.config.outputPath, { recursive: true });
    this.writeStream = createWriteStream(filepath);
  }

  private writeToFile(data: Buffer): void {
    this.writeStream.write(data);
  }

  private close() {
    this.connection.off(WebSocketEvents.Message, this.onMessageFunc);
    this.connection.off(WebSocketEvents.Close, this.onCloseFunc);

    this.writeStream.close();
    this.writeStream = null;
  }
}
