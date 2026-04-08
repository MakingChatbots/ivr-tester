import type { CallStreamAdapter } from '../call/CallStreamAdapter';

export type CallInteractor<T> = (call: CallStreamAdapter) => Promise<T>;
