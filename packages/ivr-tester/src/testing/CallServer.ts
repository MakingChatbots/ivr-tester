import ws, { AddressInfo, Server } from "ws";
import { TwilioCall } from "../call/TwilioCall";
import { URL } from "url";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { IvrTest } from "../handlers/TestHandler";
import { Call } from "../call/Call";

/** @internal */
export interface CallHandlingServer {
  wss: Server;
  local: URL;
}

export interface CallServerEventProbe {
  callConnected: () => void;
  callHungUpAsNoTestAssigned: (reason: string) => void;
}

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  test: IvrTest;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

export interface TestAssigner {
  assign(): TestAssigned | NoneAssigned;
}

export interface TestExecutor {
  startTest(test: IvrTest, call: Call): Promise<IvrTest>;
}

export class CallServer {
  constructor(
    private readonly dtmfBufferGenerator: DtmfBufferGenerator,
    private readonly testAssigner: TestAssigner,
    private readonly testExecutor: TestExecutor,
    private readonly probe: CallServerEventProbe = {
      callConnected: () => undefined,
      callHungUpAsNoTestAssigned: () => undefined,
    }
  ) {}

  private static formatServerUrl(server: Server): URL {
    const address = server.address() as AddressInfo;

    switch (address.family) {
      case "IPv4":
        return new URL(`http://${address.address}:${address.port}`);
      case "IPv6": // https://tools.ietf.org/html/rfc2732#section-2
        return new URL(`http://[${address.address}]:${address.port}`);
      default:
        throw new Error(`Unrecognised '${address.family}' address family`);
    }
  }

  public static convertToWebSocketUrl(serverUrl: string | URL): URL {
    const streamUrl = new URL(serverUrl.toString());
    streamUrl.pathname = "/";
    streamUrl.protocol = streamUrl.protocol === "https:" ? "wss" : "ws";

    return streamUrl;
  }

  public listen(port: number): Promise<CallHandlingServer> {
    const wss = new Server({ port });
    wss.on("connection", (ws) => this.callConnected(ws));

    return new Promise<CallHandlingServer>((resolve, reject) => {
      const onError = (err: Error) => reject(err);

      wss.on("error", onError);
      wss.on("listening", () => {
        wss.off("error", onError);
        resolve({
          wss,
          local: CallServer.convertToWebSocketUrl(
            CallServer.formatServerUrl(wss)
          ),
        });
      });
    });
  }

  private callConnected(callWebSocket: ws): void {
    this.probe.callConnected();

    const call = new TwilioCall(callWebSocket, this.dtmfBufferGenerator);
    // TODO If I want to assign a test based on call from/to then could await for details. e.g. call.waitForDetails()

    const result = this.testAssigner.assign();
    if (result.isAssigned === true) {
      this.testExecutor.startTest(result.test, call);
    } else {
      call.hangUp();
      this.probe.callHungUpAsNoTestAssigned(result.reason);
    }
  }
}
