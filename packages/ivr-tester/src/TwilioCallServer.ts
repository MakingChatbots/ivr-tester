import ws, { AddressInfo, Server } from "ws";
import { TwilioCall } from "./call/twilio/TwilioCall";
import { URL } from "url";
import { DtmfBufferGenerator } from "./call/dtmf/DtmfBufferGenerator";
import { Emitter } from "./Emitter";
import { IvrTesterLifecycleEvents } from "./IvrTester";
import { TranscriberFactory } from "./call/transcription/plugin/TranscriberFactory";
import { ArgumentUndefinedError } from "./ArgumentUndefinedError";

// export type CallServerEvents = {
//   callConnected: { call: Call };
// testStarted: { testSession: TestSession };

// listening: { localUrl: URL };
// stopped: undefined;
// error: { error: Error };
// };

export interface CallServer {
  listen(port: number): Promise<URL>;
  stop(): void;
}

export class TwilioCallServer implements CallServer {
  private wss: Server;

  constructor(
    private readonly dtmfBufferGenerator: DtmfBufferGenerator,
    private readonly ivrTesterLifecycle: Emitter<IvrTesterLifecycleEvents>,

    // TODO This doesn't feel like the responsibility of this class
    private readonly transcriberFactory: TranscriberFactory
  ) {
    if (!dtmfBufferGenerator) {
      throw new ArgumentUndefinedError("dtmfBufferGenerator");
    }
    if (!ivrTesterLifecycle) {
      throw new ArgumentUndefinedError("ivrTesterLifecycle");
    }
    if (!transcriberFactory) {
      throw new ArgumentUndefinedError("transcriberFactory");
    }
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

  public listen(port: number): Promise<URL> {
    if (this.wss) {
      throw new Error("Server already started");
    }

    this.wss = new Server({ port });

    return new Promise<URL>((resolve, reject) => {
      const onError = (err: Error) => reject(err);

      this.wss.on("error", onError);
      this.wss.on("listening", () => {
        this.wss.off("error", onError);

        const localUrl = TwilioCallServer.convertToWebSocketUrl(
          TwilioCallServer.formatServerUrl(this.wss)
        );
        this.ivrTesterLifecycle.emit("callServerListening", { localUrl });

        this.wss.on("connection", (ws) => this.callConnected(ws));
        this.wss.on("close", () => this.closed());
        this.wss.on("error", (error) => this.serverError(error));

        resolve(localUrl);
      });
    });
  }

  public async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (!this.wss) {
        resolve();
        return;
      }

      this.wss.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      this.wss = undefined;
    });
  }

  private callConnected(callWebSocket: ws): void {
    const call = new TwilioCall(
      callWebSocket,
      this.dtmfBufferGenerator,
      this.transcriberFactory
    );

    this.ivrTesterLifecycle.emit("callConnected", { call });
    callWebSocket.on("error", (error) => {
      this.ivrTesterLifecycle.emit("callErrored", { error });
    });
    callWebSocket.on("close", () => {
      this.ivrTesterLifecycle.emit("callDisconnected", { call });
    });
  }

  private closed(): void {
    this.ivrTesterLifecycle.emit("callServerStopped", undefined);
    this.wss = undefined;
  }

  private serverError(error: Error): void {
    this.ivrTesterLifecycle.emit("callServerErrored", { error });
  }
}
