import { IvrTesterLifecycle } from "./PluginManager";
import { TestSession } from "../IvrTester";
import { IvrTesterController } from "../interactions/scenarioTest/TestRunnerManager";

/**
 * Interface for developing a plugin that hooks into the life-cycle of a
 * test.
 */
export interface IvrTesterPlugin {
  initialise(
    pluginManager: IvrTesterLifecycle,
    ivrTesterController: IvrTesterController
  ): void;
  testStarted?: (testSession: TestSession) => void;
}
