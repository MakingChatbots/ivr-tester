import WebSocket from "ws";
import { CallServer, TwilioCallServer } from "./TwilioCallServer";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import getPort from "get-port";
import { URL } from "url";
import waitForExpect from "wait-for-expect";
import { TwilioCall } from "../call/TwilioCall";
import {
  NoneAssigned,
  TestAssigned,
  TestAssigner,
} from "./IteratingTestAssigner";
import { TestExecutor } from "./TestExecutor";
import { Scenario } from "../configuration/scenario/Scenario";

const waitForConnection = async (ws: WebSocket): Promise<void> =>
  new Promise((resolve) => ws.on("open", resolve));

const fiveSeconds = 10 * 1000;
jest.setTimeout(fiveSeconds);

describe("Call Server", () => {
  let callServer: CallServer;
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

  test("server's local websocket URL", async () => {
    callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );

    const port = await getPort();
    const serverUrl = await callServer.listen(port);

    expect(serverUrl).toEqual(new URL(`ws://[::]:${port}/`));
  });

  test("call closed when call connected and no test assigned", async () => {
    testAssigner.assign.mockReturnValue({
      isAssigned: false,
      reason: "test reason",
    });

    callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );

    const serverUrl = await callServer.listen(await getPort());

    callConnection = new WebSocket(serverUrl);
    await waitForConnection(callConnection);

    await waitForExpect(() =>
      expect(callConnection.readyState).toBe(callConnection.CLOSED)
    );
  });

  test("test assigned started when call connected", async () => {
    const scenario: Scenario = {
      name: "example-test",
      steps: undefined,
    };

    testAssigner.assign.mockReturnValue({ isAssigned: true, scenario });

    callServer = new TwilioCallServer(
      dtmfGenerator,
      testAssigner,
      testExecutor
    );

    const serverUrl = await callServer.listen(await getPort());

    callConnection = new WebSocket(serverUrl);
    await waitForConnection(callConnection);

    await waitForExpect(() =>
      expect(testExecutor.startTest).toBeCalledWith(
        scenario,
        expect.any(TwilioCall)
      )
    );
  });
});
