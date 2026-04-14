import { randomUUID } from 'node:crypto';
import { URL } from 'node:url';

import z from 'zod';
import type { Caller } from './call/Caller.js';
import type { CallStreamAdapter } from './call/CallStreamAdapter.js';
import type { CallInteractor } from './call-interactors/CallInteractor.js';
import type { IvrNumber } from './configuration/call/IvrNumber.js';
import { Debugger } from './Debugger.js';
import { TypedEmitter } from './Emitter.js';

import ws = require('ws');

export interface RunnableTester {
  run<T>(
    context: { subject: IvrNumber; publicServerUrl?: string },
    callInteractor: CallInteractor<T>,
  ): Promise<T>;
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
  private static readonly debug = Debugger.getPackageDebugger();

  private readonly callsConnected: TypedEmitter<CallsConnectEvents>;

  private wss: ws.Server | undefined = undefined;
  private wssUrls: { httpUrl: URL; wsUrl: URL } | undefined = undefined;

  private readonly caller: Caller<IvrNumber | Buffer>;

  constructor(caller: Caller<IvrNumber | Buffer>) {
    this.caller = caller;
    this.callsConnected = new TypedEmitter<CallsConnectEvents>();
  }

  private static formatServerUrl(server: ws.Server): URL {
    const address = server.address() as ws.AddressInfo;

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

  private static async waitUntilListening(wss: ws.Server): Promise<{ httpUrl: URL; wsUrl: URL }> {
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

  /**
   * @param localServerPort Port that the server listens on. Defaults to 8080
   */
  public async startServer(localServerPort = 8080): Promise<{ httpUrl: URL; wsUrl: URL }> {
    const portValidation = z.number().int().min(0).max(65535).safeParse(localServerPort);
    if (portValidation.success === false) {
      throw new Error(`localServerPort: ${portValidation.error.message}`);
    }

    if (!this.wss) {
      this.wss = new ws.Server({ port: localServerPort });
      this.wss.on('connection', (ws) => this.callConnected(ws));

      this.wssUrls = await IvrTester.waitUntilListening(this.wss);
    }

    return this.wssUrls;
  }

  private callConnected(callWebSocket: ws): void {
    // TODO Start timeout, or add Global timeout value to connected call
    // TODO What to do if call doesn't contain Call ID

    const call = this.caller.callStreamReceived(callWebSocket);
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

  /**
   * @param context.publicServerUrl URL of the server that is publicly accessible.
   *     This is the server that Twilio connects to when creating the bidirectional stream of the call.
   */
  public async run<T>(
    context: { subject: IvrNumber; publicServerUrl?: string },
    callInteractor: CallInteractor<T>,
  ): Promise<T> {
    if (!this.wssUrls) {
      throw new Error('startServer must be called first');
    }

    const publicServerUrlValidation = z
      .url()
      .optional()
      .transform((arg) => (arg ? IvrTester.convertToWebSocketUrl(arg).toString() : undefined))
      .safeParse(context.publicServerUrl);
    if (publicServerUrlValidation.error) {
      throw new Error(`publicServerUrl: ${publicServerUrlValidation.error.message}`);
    }

    const subjectValidation = z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .safeParse(context.subject);

    if (subjectValidation.error) {
      throw new Error(`subject: ${subjectValidation.error.message}`);
    }

    const callId = randomUUID();
    await this.caller.call(
      context.subject,
      publicServerUrlValidation.data || this.wssUrls.wsUrl,
      callId,
    );

    // TODO Add timeout for waiting for call
    // TODO Add ability to queue calls for same number

    // Wait for call to connect with same Call ID
    return new Promise((resolve, reject) => {
      const listener = (e: { call: CallStreamAdapter; callId: string }) => {
        if (e.callId === callId) {
          this.callsConnected.off('callConnected', listener);
          callInteractor(e.call).then(resolve).catch(reject);
        }
      };
      this.callsConnected.on('callConnected', listener);
    });
  }
}
