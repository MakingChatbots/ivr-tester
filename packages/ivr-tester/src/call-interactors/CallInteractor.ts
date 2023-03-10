import { Call } from '../call/Call';

export type CallInteractor<T> = (call: Call) => Promise<T>;
