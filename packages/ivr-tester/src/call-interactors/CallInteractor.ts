import type { CallStreamAdapter } from '../call/CallStreamAdapter.js';

export type CallInteractor<T> = (call: CallStreamAdapter) => Promise<T>;
