import {EventEmitter} from "events";
import WebSocket from "ws"
import internal, {Transform} from 'stream';
import {EventStreamMarshaller} from "@aws-sdk/eventstream-marshaller";
import {fromUtf8, toUtf8} from "@aws-sdk/util-utf8-node";
import {Transcriber} from "ivr-tester";
import {WaveFile} from "wavefile";
const crypto = require("crypto");
const v4 = require("./aws-signature-v4"); // to generate our pre-signed URL

// eslint-disable-next-line no-unused-vars
enum Language {
  // eslint-disable-next-line no-unused-vars
  EnglishBritish= "en-GB",
  // eslint-disable-next-line no-unused-vars
  EnglishUs="en-US",
  // eslint-disable-next-line no-unused-vars
  SpanishUs="es-US",
  // eslint-disable-next-line no-unused-vars
  FrenchCanadian="fr-CA",
  // eslint-disable-next-line no-unused-vars
  French="fr-FR",
  // eslint-disable-next-line no-unused-vars
  German="de-DE",
  // eslint-disable-next-line no-unused-vars
  Italian="it-IT"
}

// our converter between binary AWS event stream messages and JSON
const eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);


// Documentation https://docs.aws.amazon.com/transcribe/latest/dg/websocket.html

function getAudioEventMessageTransformer() {
  return new Transform({
    transform: (chunk, encoding, callback) => {
      const message = {
        headers: {
          ":message-type": {
            type: "string",
            value: "event",
          },
          ":event-type": {
            type: "string",
            value: "AudioEvent",
          },
        },
        body: Buffer.from(chunk),
      };
      // @ts-ignore
      const binary = eventStreamMarshaller.marshall(message);
      return callback(null, Buffer.from(binary));
    },
  });
}

function getAwsEventTransformerStream() {
  return new Transform({
    transform: (chunk, encoding, callback) => {
      const messageWrapper = eventStreamMarshaller.unmarshall(
          Buffer.from(chunk)
      );
      const messageBody = JSON.parse(
          // eslint-disable-next-line prefer-spread
          String.fromCharCode.apply(String, messageWrapper.body)
      );
      if (messageWrapper.headers[":message-type"].value === "event") {
        const results = messageBody.Transcript.Results;
        if (results.length === 0) return callback();
        let transcript = results[0].Alternatives[0].Transcript;
        transcript = decodeURIComponent(escape(transcript));
        if (results[0].IsPartial) {
          console.log(`Partial transcript: ${transcript}`);
          return callback();
        } else {
          console.log(`Full transcript: ${transcript}`);
          return callback(null, transcript);
        }
      } else {
        // This is the error
        return callback(messageBody.Message);
      }
    },
  });
}

function getSignedTranscribeWebsocketUrl() {
  const endpoint = `transcribestreaming.${process.env.AWS_REGION}.amazonaws.com:8443`;

  // get a preauthenticated URL that we can use to establish our WebSocket
  return v4.createPresignedURL(
      "GET",
      endpoint,
      "/stream-transcription-websocket",
      "transcribe",
      crypto.createHash("sha256").update("", "utf8").digest("hex"),
      {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        protocol: "wss",
        expires: 15,
        region: process.env.AWS_REGION,
        query: `language-code=${Language.EnglishBritish}&media-encoding=pcm&sample-rate=8000`,
      }
  );
}

const pcmStream = () => new Transform({
  transform: (chunk, encoding, callback) => {
    const wav = new WaveFile();
    wav.fromScratch(1, 8000, "8m", chunk);
    wav.fromMuLaw();
    // @ts-ignore
    return callback(null, Buffer.from(wav.data.samples));
  },
});

export class AmazonTranscribeService extends EventEmitter implements Transcriber {
  private readonly audioEventMessageTransformer: Transform;
  private readonly awsEventTransformerStream: Transform;
  private readonly awsWsStream;
  private readonly awsWebSocket;
  // private readonly readableStream: internal.Readable;

  constructor(private readonly readableStream: internal.Readable) { //  = new Stream.Readable();
    super();
    const awsUrl = getSignedTranscribeWebsocketUrl();
    this.awsWebSocket = new WebSocket(awsUrl);
    this.awsWsStream = WebSocket.createWebSocketStream(this.awsWebSocket, { encoding: 'binary' });
    // this.awsWsStream = websocket(awsUrl, {
    //   @ts-ignore
      // binaryType: "arraybuffer",
    // });
    this.awsWsStream.on("error", (error) => {
      console.error(error);
    });

    this.audioEventMessageTransformer = getAudioEventMessageTransformer();
    this.awsEventTransformerStream = getAwsEventTransformerStream();

    this.awsEventTransformerStream.on("data", (data) => {
      const transcription = data.toString('utf8');
      this.emit("transcription", transcription);
    });


    this.readableStream
        .pipe(pcmStream())
        .pipe(this.audioEventMessageTransformer)
        .pipe(this.awsWsStream)
        .pipe(this.awsEventTransformerStream);
  }

  close(): void {
    console.log('Closing, sending empty buffer to Transcribe');
    this.audioEventMessageTransformer.write(Buffer.from([]));
  }

  transcribe(payload: string): void {
    // this.readableStream.write(payload);
  }

}

export const amazonTranscribe = () => (readableStream: internal.Readable) => new AmazonTranscribeService(readableStream);

