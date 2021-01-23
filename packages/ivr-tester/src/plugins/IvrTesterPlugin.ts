import { PluginEvents } from "./PluginManager";
import { Emitter } from "../Emitter";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  initialise(eventEmitter: Emitter<PluginEvents>): void;
}
