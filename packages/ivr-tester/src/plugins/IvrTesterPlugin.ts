import { PluginEvents } from "./PluginManager";
import { Emitter } from "../Emitter";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  name(): string;
  initialise(eventEmitter: Emitter<PluginEvents>): void;
}
