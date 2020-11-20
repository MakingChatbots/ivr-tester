import ws from "ws";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import * as path from "path";
import { WebSocketEvents } from "./TwilioCall";
import {
  callParameterSerializer,
  TwilioConnectionEvents,
  TwilioMediaStreamStartEvent,
} from "../twilio";
import { IvrTest } from "./TestHandler";

/** @internal */
export interface StreamDetails {
  sid: string;
  phoneNumbers: { from: string; to: string };
}

/** @internal */
export interface RecorderConfig {
  outputPath: string;
  filename?: string | ((stream: StreamDetails, test: IvrTest) => string);
}

/** @internal */
export class MediaStreamRecorder {
  private static readonly FILE_EXT = "wav";

  private writeStream: WriteStream;
  private readonly onMessageFunc: (message: string) => void;
  private readonly onCloseFunc: () => void;

  constructor(
    private readonly connection: ws,
    private readonly config: RecorderConfig,
    private readonly test: IvrTest
  ) {
    this.onMessageFunc = this.processMessage.bind(this);
    this.onCloseFunc = this.close.bind(this);
    connection.on(WebSocketEvents.Message, this.onMessageFunc);
    connection.on(WebSocketEvents.Close, this.onCloseFunc);
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
    const call = callParameterSerializer.extractParameters(event);
    let filename: string;

    if (typeof this.config.filename === "string") {
      filename = this.config.filename;
    } else if (typeof this.config.filename === "function") {
      filename = this.config.filename(
        {
          sid: event.streamSid,
          phoneNumbers: call,
        },
        this.test
      );
    } else {
      filename = `${Date.now()}-${event.streamSid}`;
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
