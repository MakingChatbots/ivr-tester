import { randomUUID } from 'node:crypto';
import { URL } from 'node:url';
import type ws from 'ws';
import { type AddressInfo, Server } from 'ws';
import type { Caller } from './call/Caller';
import type { CallStreamAdapter } from './call/CallStreamAdapter';
import type { CallInteractor } from './call-interactors/CallInteractor';
import type { CallStreamAdapterFactory, Config } from './configuration/Config';
import type { IvrNumber } from './configuration/call/IvrNumber';
import { type Subject, validateSubject } from './configuration/call/validateSubject';
import { validateConfig } from './configuration/validateConfig';
import { Debugger } from './Debugger';
import { TypedEmitter } from './Emitter';

export interface RunnableTester {
  run<T>(subject: Subject, callInteractor: CallInteractor<T>): Promise<T>;
}

type CallsConnectEvents = {
  callConnected: { call: CallStreamAdapter; callId: string };
};

/**
 * Despite the name this manages the interaction with an IVR call flow
 * e.g. making a call, sets up transcriber, clean-up, Twilio costs reporting etc
 *
 * It is up to the implementor of the {@link CallInteractor} to manage how it will
 * interact with the call
 */
export class IvrTester implements RunnableTester {
  private static debug = Debugger.getPackageDebugger();

  private readonly config: Config;
  private readonly callsConnected: TypedEmitter<CallsConnectEvents>;

  private wss: Server | undefined = undefined;
  private wssUrls: { httpUrl: URL; wsUrl: URL } | undefined = undefined;

  private caller: Caller<IvrNumber | Buffer>;
  private callStreamAdapterFactory: CallStreamAdapterFactory;

  constructor(readonly configuration: Config) {
    const result = validateConfig(configuration);
    if (result.error) {
      throw result.error;
    }
    if (!result.config) {
      throw new Error('Error loading configuration');
    }

    this.config = result.config;
    this.callsConnected = new TypedEmitter<CallsConnectEvents>();

    this.caller = configuration.caller;
    this.callStreamAdapterFactory = configuration.callStreamAdapterFactory;
  }

  private static formatServerUrl(server: Server): URL {
    const address = server.address() as AddressInfo;

    switch (address.family) {
      case 'IPv4':
        return new URL(`http://${address.address}:${address.port}`);
      case 'IPv6': // https://tools.ietf.org/html/rfc2732#section-2
        return new URL(`http://[${address.address}]:${address.port}`);
      default:
        throw new Error(`Unrecognised '${address.family}' address family`);
    }
  }

  public static convertToWebSocketUrl(serverUrl: string | URL): URL {
    const streamUrl = new URL(serverUrl.toString());
    streamUrl.pathname = '/';
    streamUrl.protocol = streamUrl.protocol === 'https:' ? 'wss' : 'ws';

    return streamUrl;
  }

  private static async waitUntilListening(wss: Server): Promise<{ httpUrl: URL; wsUrl: URL }> {
    return new Promise<{ httpUrl: URL; wsUrl: URL }>((resolve, reject) => {
      const onError = (err: Error) => reject(err);

      wss.on('error', onError);
      wss.on('listening', () => {
        wss.off('error', onError);

        resolve({
          httpUrl: IvrTester.formatServerUrl(wss),
          wsUrl: IvrTester.convertToWebSocketUrl(IvrTester.formatServerUrl(wss)),
        });
      });
    });
  }

  public async startServer(): Promise<{ httpUrl: URL; wsUrl: URL }> {
    if (!this.wss) {
      this.wss = new Server({ port: this.config.localServerPort });
      this.wss.on('connection', (ws) => this.callConnected(ws));

      this.wssUrls = await IvrTester.waitUntilListening(this.wss);
    }

    return this.wssUrls;
  }

  private callConnected(callWebSocket: ws): void {
    // TODO Start timeout, or add Global timeout value to connected call
    // TODO What to do if call doesn't contain Call ID

    const call = this.callStreamAdapterFactory(callWebSocket);
    call.on('callMediaStreamStarted', (e) => {
      if (!e.callId) {
        IvrTester.debug(
          `Call does not have custom parameter Call ID necessary to route to the Interactor. Closing call. Stream ID: %s`,
          e.streamSid,
        );
        call.close('Call does not have a Call ID necessary to route it');
        return;
      }

      this.callsConnected.emit('callConnected', { call, callId: e.callId });
    });
  }

  public async stopServer(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (!this.wss) {
        resolve();
        return;
      }

      this.wss.close((err) => {
        this.wss = undefined;
        this.wssUrls = undefined;

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async run<T>(
    subject: Subject,
    callInteractor: CallInteractor<T>,
    config?: {
      publicServerUrl: string;
    },
  ): Promise<T> {
    const publicServerUrl = config?.publicServerUrl
      ? IvrTester.convertToWebSocketUrl(config.publicServerUrl).toString()
      : undefined;

    const subjectValidationResult = validateSubject(subject);
    if (subjectValidationResult.error) {
      throw subjectValidationResult.error;
    }

    const callId = randomUUID();
    await this.caller.call(
      subject,
      publicServerUrl || this.config.publicServerUrl || this.wssUrls.wsUrl,
      callId,
    );

    // TODO Add timeout for waiting for call
    // TODO Add ability to queue calls for same number

    // Wait for call to connect with same Call ID
    return new Promise((resolve, reject) => {
      this.callsConnected.on('callConnected', (e) => {
        if (e.callId === callId) {
          callInteractor(e.call).then(resolve).catch(reject);
        }
      });
    });
  }
}
