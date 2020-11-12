import { TestEvents } from "./TestEvents";
import { SetupEvents } from "./SetupEvents";
import { EventEmitter } from "events";
import { Emitter } from "../Emitter";

export interface SetupEventEmitter extends Emitter<SetupEvents & TestEvents> {}
export interface TestEventEmitter extends Emitter<SetupEvents & TestEvents> {}

export interface LifecycleEventEmitter
  extends SetupEventEmitter,
    TestEventEmitter {}

export const createLifecycleEventEmitter = (): LifecycleEventEmitter =>
  new EventEmitter();
