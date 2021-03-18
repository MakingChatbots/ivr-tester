import { PluginEvents } from "./PluginManager";
import { Emitter } from "../Emitter";
import { Runner } from "../testRunner";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  initialise(eventEmitter: Emitter<PluginEvents>, testRunner: Runner): void;
}
