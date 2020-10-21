import { LifecycleEventEmitter } from "./events/eventEmitter";

export interface IvrTesterPlugin {
  initialise(eventEmitter: LifecycleEventEmitter): void;
}
