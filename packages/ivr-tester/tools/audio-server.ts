import { Server } from "ws";
import { WebSocketEvents } from "../src/call/TwilioCall";
import ngrok from "ngrok";
import { createWriteStream } from "fs";
import * as path from "path";
import { TwilioCallServer } from "../src/testing/TwilioCallServer";

function startServer(
  port: number,
  url: string,
  recordingDir: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const wss = new Server({ port });

    wss.on("close", resolve);
    wss.on("connection", (ws) => {
      const audioFilePath = path.join(recordingDir, `${Date.now()}.raw`);
      console.log(`Saving raw audio stream to ${audioFilePath}`);

      const writeStream = createWriteStream(
        path.join(recordingDir, `${Date.now()}.raw`)
      );

      ws.on("close", resolve);
      ws.on("error", reject);
      ws.on("message", (message) => {
        if (typeof message !== "string") {
          return;
        }

        console.log(message);

        const data = JSON.parse(message);
        if (data.event === "media") {
          writeStream.write(Buffer.from(data.media.payload, "base64"));
        }
      });
    });
  });
}

const audioFileDirectory = __dirname;
const port = 8080;

ngrok.connect(port).then((url) => {
  console.log(`WebSocket URL: ${TwilioCallServer.convertToWebSocketUrl(url)}`);
  startServer(port, url, audioFileDirectory).catch((err) => {
    throw err;
  });
});
