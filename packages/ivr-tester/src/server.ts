import ws, { AddressInfo, Server } from "ws";
import { TranscriptionHandler } from "./handlers/TranscriptionHandler";
import {
  MediaStreamRecorder,
  StreamDetails,
} from "./handlers/MediaStreamRecorder";
import {
  IvrTest,
  TestConditionMet,
  TestFailed,
  TestHandler,
  TestPassed,
} from "./handlers/TestHandler";
import { TwilioCall } from "./handlers/TwilioCall";
import { TestLifecycleEventEmitter } from "./plugins/events/eventEmitter";
import { URL } from "url";
import { DtmfBufferGenerator } from "./dtmf/DtmfPlayer";
import { Transcriber } from "./transcribers/Transcriber";

export const formatServerUrl = (server: CallHandlingServer): URL => {
  const address = server.wss.address() as AddressInfo;

  switch (address.family) {
    case "IPv4":
      return new URL(`http://${address.address}:${address.port}`);
    case "IPv6": // https://tools.ietf.org/html/rfc2732#section-2
      return new URL(`http://[${address.address}]:${address.port}`);
    default:
      throw new Error(`Unrecognised '${address.family}' address family`);
  }
};

/**
 * Factory to create a instance of a transcriber per test
 */
export type TranscriberFactory = () => Transcriber;

export interface ServerConfig {
  dtmfGenerator?: DtmfBufferGenerator;
  transcriber: TranscriberFactory;
  recording?: {
    outputPath: string;
    filename?: string | ((stream: StreamDetails) => string);
  };

  /**
   * Port that server is to listen on.
   * This value can be overridden by setting the environment variable LOCAL_SERVER_PORT
   */
  localServerPort?: number | undefined;
}

const initialiseConnectionHandlers = (
  wss: Server,
  ws: ws,
  config: ServerConfig,
  ivrTest: IvrTest,
  testEventEmitter: TestLifecycleEventEmitter
) => {
  const call = new TwilioCall(ws, config.dtmfGenerator);

  if (config.recording) {
    new MediaStreamRecorder(ws, config.recording, ivrTest);
  }

  const transcriptionHandler = new TranscriptionHandler(
    ws,
    config.transcriber()
  );
  new TestHandler(call, transcriptionHandler, ivrTest)
    .on("ConditionMet", (event: TestConditionMet) => {
      testEventEmitter.emit("ivrTestConditionMet", event);
    })
    .on("TestPassed", (event: TestPassed) => {
      testEventEmitter.emit("ivrTestPassed", event);
    })
    .on("TestFailed", (event: TestFailed) => {
      testEventEmitter.emit("ivrTestFailed", event);
    });
};

export interface CallHandlingServer {
  wss: Server;
}

export const startServerListening = (
  config: ServerConfig,
  ivrTest: IvrTest[],
  testEventEmitter: TestLifecycleEventEmitter
): Promise<CallHandlingServer> => {
  const testIterator = ivrTest.entries();

  const wss = new Server({ port: config.localServerPort });
  wss.on("connection", (ws) => {
    testEventEmitter.emit("callConnected", undefined);

    const testEntry = testIterator.next();
    if (!testEntry.done) {
      const [index, test] = testEntry.value;
      testEventEmitter.emit("callAssignedTest", { test, index });

      initialiseConnectionHandlers(wss, ws, config, test, testEventEmitter);
    }
  });

  return new Promise<CallHandlingServer>((resolve, reject) => {
    const onError = (err: Error) => reject(err);
    wss.on("error", onError);
    wss.on("listening", () => {
      wss.off("error", onError);
      resolve({ wss });
    });
  });
};
