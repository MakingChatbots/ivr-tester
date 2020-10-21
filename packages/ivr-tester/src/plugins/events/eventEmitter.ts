import { TestEvents } from "./testEvents";
import { SetupEvents } from "./setupEvents";
import { EventEmitter } from "events";

// https://rjzaworski.com/2019/10/event-emitters-in-typescript

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

export interface TestLifecycleEventEmitter extends Emitter<TestEvents> {}
export interface SetupLifecycleEventEmitter extends Emitter<SetupEvents> {}

export interface LifecycleEventEmitter
  extends Emitter<TestEvents & SetupEvents> {}

export const createLifecycleEventEmitter = (): LifecycleEventEmitter =>
  new EventEmitter();
