import WebSocket from "ws";
import { CallHandlingServer, TwilioCallServer } from "./TwilioCallServer";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import getPort from "get-port";
import { URL } from "url";
import waitForExpect from "wait-for-expect";
import { IvrTest } from "../handlers/TestInstanceClass";
import { TwilioCall } from "../call/TwilioCall";
import { NoneAssigned, TestAssigned, TestAssigner } from "./TestAssigner";
import { TestExecutor } from "./TestExecutor";

const waitForConnection = async (ws: WebSocket): Promise<void> =>
  new Promise((resolve) => ws.on("open", resolve));

const fiveSeconds = 10 * 1000;
jest.setTimeout(fiveSeconds);

describe("Call Server", () => {
  let server: CallHandlingServer;
  let callConnection: WebSocket;

  let testAssigner: jest.Mocked<TestAssigner>;
  let testExecutor: jest.Mocked<TestExecutor>;
  let dtmfGenerator: jest.Mocked<DtmfBufferGenerator>;

  beforeEach(() => {
    testAssigner = {
      assign: jest.fn<NoneAssigned | TestAssigned, undefined>(),
    };
    testExecutor = { startTest: jest.fn() };
    dtmfGenerator = { generate: jest.fn() };
  });

  afterEach(async () => {
    console.group("Tidy Connections");

    if (server) {
      console.debug("Closing call server...");

      await new Promise<void>((resolve, reject) => {
        server.wss.close((err) => {
          if (err) {
            reject(err);
          } else {
            console.debug("Closed call server");
            resolve();
          }
        });
      });
    }

    if (callConnection && callConnection.readyState !== WebSocket.CLOSED) {
      console.debug("Waiting for call connection to close...");
      await new Promise((resolve) => callConnection.on("close", resolve));
      console.debug("Call connection closed");
    }
    console.groupEnd();
  });

  test("server's local websocket URL", async () => {
    const callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );

    const port = await getPort();
    server = await callServer.listen(port);

    expect(server.local).toEqual(new URL(`ws://[::]:${port}/`));
  });

  test("call closed when call connected and no test assigned", async () => {
    testAssigner.assign.mockReturnValue({
      isAssigned: false,
      reason: "test reason",
    });

    const callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );
    server = await callServer.listen(await getPort());

    callConnection = new WebSocket(server.local);
    await waitForConnection(callConnection);

    await waitForExpect(() =>
      expect(callConnection.readyState).toBe(callConnection.CLOSED)
    );
  });

  test("test assigned started when call connected", async () => {
    const test: IvrTest = { name: "example-test", test: undefined };

    testAssigner.assign.mockReturnValue({ isAssigned: true, test });

    const callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );

    server = await callServer.listen(await getPort());

    callConnection = new WebSocket(server.local);
    await waitForConnection(callConnection);

    await waitForExpect(() =>
      expect(testExecutor.startTest).toBeCalledWith(
        test,
        expect.any(TwilioCall)
      )
    );
  });
});
