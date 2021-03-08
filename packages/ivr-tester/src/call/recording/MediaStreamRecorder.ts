import * as fs from "fs";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import * as path from "path";
import { WebSocketEvents } from "../TwilioCall";
import { TwilioConnectionEvents } from "../twilio";
import { FilenameFactory } from "./filename/FilenameFactory";
import { filenameContainingIvrNumberAndTestName } from "./filename/filenameContainingIvrNumberAndTestName";
import { Config } from "../../configuration/Config";
import { ConfigurationError } from "../../configuration/ConfigurationError";
import { TwilioCaller, TwilioMediaStreamStartEvent } from "../TwilioCaller";
import { IvrTesterPlugin } from "../../plugins/IvrTesterPlugin";
import { Emitter } from "../../Emitter";
import { PluginEvents } from "../../plugins/PluginManager";
import { TestSession } from "../../testRunner";

/**
 * Details about the stream about to be recorded
 */
export interface StreamDetails {
  sid: string;
  call: { from: string; to: string };
}

export interface RecorderConfig {
  outputPath: string;
  filename?: string | FilenameFactory;
}

export const mediaStreamRecorderPlugin = (config: Config): IvrTesterPlugin => {
  if (!config.recording) {
    return {
      initialise(): void {
        /* Intentionally empty */
      },
    };
  }

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
    throw new ConfigurationError("recording.outputPath", "Path does not exist");
  }

  return {
    initialise(eventEmitter: Emitter<PluginEvents>): void {
      eventEmitter.on("callServerStarted", ({ callServer }) => {
        callServer.on("testStarted", ({ testSession }) => {
          new MediaStreamRecorder(testSession, recorderConfig);
        });
      });
    },
  };
};

export class MediaStreamRecorder {
  private static readonly FILE_EXT = "wav";

  private writeStream: WriteStream;
  private readonly processMessageRef: (message: string) => void;
  private readonly closeRef: () => void;

  constructor(
    private readonly testSession: TestSession,
    private readonly config: RecorderConfig
  ) {
    this.processMessageRef = this.processMessage.bind(this);
    this.closeRef = this.close.bind(this);

    const connection = this.testSession.call.getStream();
    connection
      .on(WebSocketEvents.Message, this.processMessageRef)
      .on(WebSocketEvents.Close, this.closeRef);
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
    }
  }

  private createFilename(event: TwilioMediaStreamStartEvent): string {
    const call = TwilioCaller.extractParameters(event);
    let filename: string;

    if (typeof this.config.filename === "string") {
      filename = this.config.filename;
    } else if (typeof this.config.filename === "function") {
      filename = this.config.filename(
        {
          sid: event.streamSid,
          call,
        },
        this.testSession.callFlowTestDefinition
      );
    }

    return `${filename}.${MediaStreamRecorder.FILE_EXT}`;
  }

  private createFile(event: TwilioMediaStreamStartEvent): void {
    const filename = this.createFilename(event);
    const filepath = path.join(this.config.outputPath, filename);

    console.log(`Recording inbound audio to '${filepath}'`);
    mkdirSync(this.config.outputPath, { recursive: true });
    this.writeStream = createWriteStream(filepath);
  }

  private writeToFile(data: Buffer): void {
    this.writeStream.write(data);
  }

  private close() {
    const connection = this.testSession.call.getStream();
    connection
      .off(WebSocketEvents.Message, this.processMessageRef)
      .off(WebSocketEvents.Close, this.closeRef);

    this.writeStream.close();
    this.writeStream = null;
  }
}
