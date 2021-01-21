import ws, { AddressInfo, Server } from "ws";
import { TwilioCall } from "../call/TwilioCall";
import { URL } from "url";
import { DtmfBufferGenerator } from "../call/dtmf/DtmfBufferGenerator";
import { Emitter, TypedEmitter } from "../Emitter";
import { Call } from "../call/Call";
import { TestAssigner } from "./IteratingTestAssigner";
import { TestExecutor } from "./DefaultTestExecutor";
import { TestInstance } from "./test/TestInstanceClass";

export interface CallHandlingServer {
  // TODO This is only exposed for the sake of testing. Anyway to avoid this?
  wss: Server;
  local: URL;
}

export type CallServerEvents = {
  callConnected: { call: Call };
  testStarted: { testInstance: TestInstance };

  listening: { localUrl: URL };
  stopped: undefined;
  error: { error: Error };
};

export interface CallServer extends Emitter<CallServerEvents> {
  // getEstablishedCalls(): ReadonlyArray<Call>;
  // preventNewCalls(): void;
  listen(port: number): Promise<CallHandlingServer>;
  stop(): void;
}

export class TwilioCallServer
  extends TypedEmitter<CallServerEvents>
  implements CallServer {
  private static TestCouldNotBeAssignedReason = "TestCouldNotBeAssigned";

  // private establishedCalls: Call[] = [];
  private wss: Server;

  // private disconnectNewCalls = false;

  constructor(
    private readonly dtmfBufferGenerator: DtmfBufferGenerator,
    private readonly testAssigner: TestAssigner,
    private readonly testExecutor: TestExecutor
  ) {
    super();
  }

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

  // public getEstablishedCalls(): ReadonlyArray<Call> {
  //   return [...this.establishedCalls];
  // }

  // public preventNewCalls(): void {
  //   this.disconnectNewCalls = true;
  // }

  public listen(port: number): Promise<CallHandlingServer> {
    if (this.wss) {
      throw new Error("Server already started");
    }

    this.wss = new Server({ port });

    return new Promise<CallHandlingServer>((resolve, reject) => {
      const onError = (err: Error) => reject(err);

      this.wss.on("error", onError);
      this.wss.on("listening", () => {
        this.wss.off("error", onError);

        const localUrl = TwilioCallServer.convertToWebSocketUrl(
          TwilioCallServer.formatServerUrl(this.wss)
        );
        this.emit("listening", { localUrl });

        this.wss.on("connection", (ws) => this.callConnected(ws));
        this.wss.on("close", () => this.closed());
        this.wss.on("error", (error) => this.serverError(error));

        resolve({
          wss: this.wss,
          local: localUrl,
        });
      });
    });
  }

  public stop(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = undefined;
    }
  }

  private callConnected(callWebSocket: ws): void {
    // if (this.disconnectNewCalls) {
    //   callWebSocket.close();
    //   return;
    // }

    const call = new TwilioCall(callWebSocket, this.dtmfBufferGenerator);
    // this.establishedCalls.push(call);

    this.emit("callConnected", { call });

    const result = this.testAssigner.assign();
    if (result.isAssigned === true) {
      const testInstance = this.testExecutor.startTest(result.test, call);
      this.emit("testStarted", { testInstance });
    } else {
      call.close(TwilioCallServer.TestCouldNotBeAssignedReason);
    }
  }

  private closed(): void {
    this.emit("stopped", undefined);
    this.wss = undefined;
  }

  private serverError(error: Error): void {
    this.emit("error", { error });
  }
}
