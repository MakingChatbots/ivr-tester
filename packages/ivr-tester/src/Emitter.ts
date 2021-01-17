import { EventEmitter } from "events";

// https://rjzaworski.com/2019/10/event-emitters-in-typescript

type EventMap = Record<string, unknown>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

export class TypedEmitter<T extends EventMap> implements Emitter<T> {
  private readonly emitter = new EventEmitter();

  public on<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): TypedEmitter<T> {
    this.emitter.on(eventName, fn);
    return this;
  }

  public off<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): TypedEmitter<T> {
    this.emitter.off(eventName, fn);
    return this;
  }

  public emit<K extends EventKey<T>>(eventName: K, params: T[K]): boolean {
    return this.emitter.emit(eventName, params);
  }
}
