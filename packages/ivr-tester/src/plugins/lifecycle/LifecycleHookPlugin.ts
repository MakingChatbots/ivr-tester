import { LifecycleEventEmitter } from "./LifecycleEventEmitter";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface LifecycleHookPlugin {
  name(): string;
  initialise(eventEmitter: LifecycleEventEmitter): void;
}
