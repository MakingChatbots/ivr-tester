import WebSocket from "ws";
import { CallServer, TwilioCallServer } from "./TwilioCallServer";
import { DtmfBufferGenerator } from "./call/dtmf/DtmfBufferGenerator";
import getPort from "get-port";
import { URL } from "url";
import waitForExpect from "wait-for-expect";
import { IvrTesterLifecycleEvents } from "./IvrTester";
import { Emitter } from "./Emitter";
import { TranscriberFactory } from "./call/transcription/plugin/TranscriberFactory";

const waitForConnection = async (ws: WebSocket): Promise<void> =>
  new Promise((resolve) => ws.on("open", resolve));

const fiveSeconds = 10 * 1000;
jest.setTimeout(fiveSeconds);

describe("Call Server", () => {
  let callServer: CallServer;
  let callConnection: WebSocket;

  let ivrTesterLifecycle: jest.Mocked<Emitter<IvrTesterLifecycleEvents>>;
  let transcriberFactory: TranscriberFactory;
  let dtmfGenerator: jest.Mocked<DtmfBufferGenerator>;

  beforeEach(() => {
    ivrTesterLifecycle = {
      emit: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
    };
    transcriberFactory = {
      create: () => jest.fn() as any,
      checkCanRun: () => ({ canRun: true }),
    };
    dtmfGenerator = { generate: jest.fn() };
  });

  afterEach(async () => {
    console.group("Tidy Connections");

    if (callServer) {
      console.debug("Closing call server...");
      await callServer.stop();
      console.debug("Call server closed");
    }

    if (callConnection && callConnection.readyState !== WebSocket.CLOSED) {
      console.debug("Waiting for call connection to close...");
      await new Promise((resolve) => callConnection.on("close", resolve));
      console.debug("Call connection closed");
    }
    console.groupEnd();
  });

  test("local websocket URL returned from listen method", async () => {
    callServer = new TwilioCallServer(
      dtmfGenerator,
      ivrTesterLifecycle,
      transcriberFactory
    );

    const port = await getPort();
    const serverUrl = await callServer.listen(port);

    expect(serverUrl).toEqual(new URL(`ws://[::]:${port}/`));
  });

  test("call closed when stop called against Call instance emitted", async () => {
    callServer = new TwilioCallServer(
      dtmfGenerator,
      ivrTesterLifecycle,
      transcriberFactory
    );

    const serverUrl = await callServer.listen(await getPort());

    callConnection = new WebSocket(serverUrl);
    await waitForConnection(callConnection);

    const callConnectedEvent = ivrTesterLifecycle.emit.mock.calls[1];
    expect(callConnectedEvent[0]).toBe("callConnected");

    const payload = callConnectedEvent[1] as IvrTesterLifecycleEvents["callConnected"];
    payload.call.close("test");

    await waitForExpect(() =>
      expect(callConnection.readyState).toBe(callConnection.CLOSED)
    );
  });
});
