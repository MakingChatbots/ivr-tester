import type { TestRunner, TestSession } from "../testRunner";
import type { PluginHost } from "./PluginManager";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  initialise(pluginManager: PluginHost, testRunner: TestRunner): void;
  testStarted?: (testSession: TestSession) => void;
}
