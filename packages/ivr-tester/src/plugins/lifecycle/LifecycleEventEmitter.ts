import { TestEvents } from "./TestEvents";
import { SetupEvents } from "./SetupEvents";
import { EventEmitter } from "events";
import { Emitter } from "../../Emitter";

export type SetupEventEmitter = Emitter<SetupEvents & TestEvents>;
export type TestEventEmitter = Emitter<SetupEvents & TestEvents>;

export interface LifecycleEventEmitter
  extends SetupEventEmitter,
    TestEventEmitter {}

export const createLifecycleEventEmitter = (): LifecycleEventEmitter =>
  new EventEmitter();
