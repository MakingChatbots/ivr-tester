/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
import {LifecycleEventEmitter} from "./events/LifecycleEventEmitter";

export interface IvrTesterPlugin {
  initialise(eventEmitter: LifecycleEventEmitter): void;
}
