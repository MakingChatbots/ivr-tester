import { IvrTesterExecution } from "../IvrTester";
import { Config } from "../configuration/Config";

/**
 * Interface for developing a plugin that hooks into the life-cycle of IVR Tester.
 */
export interface IvrTesterPlugin {
  initialise(config: Config, ivrTesterExecution: IvrTesterExecution): void;
}
