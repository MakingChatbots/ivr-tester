import { PluginHost } from "./PluginManager";
import { TestRunner, TestSession } from "../testRunner";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  initialise(pluginManager: PluginHost, testRunner: TestRunner): void;
  testStarted?: (testSession: TestSession) => void;
}
