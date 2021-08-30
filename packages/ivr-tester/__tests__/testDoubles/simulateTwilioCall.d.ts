/// <reference types="node" />
export interface TwilioCallStream {
    sendMediaPayload(data: Buffer): void;
    isClosed(): boolean;
    close(): void;
}
export declare function simulateTwilioCall(serverUrl: string): Promise<TwilioCallStream>;
