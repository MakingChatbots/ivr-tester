import { Scenario } from "../../configuration/scenario/Scenario";
import { validateAndEnrichScenario } from "../../configuration/scenario/validateAndEnrichScenario";
import { IvrCallFlowInteraction } from "../../IvrTester";
import { IteratingScenarioAssigner } from "./testing/IteratingScenarioAssigner";
import { Call } from "../../call/Call";
import { CallTranscriber } from "../../call/transcription/CallTranscriber";
import { orderedScenarioStepsTest } from "./testing/test/orderedScenarioStepsTest";
import { createTestRunnerManager } from "./TestRunnerManager";

export class ScenarioTest implements IvrCallFlowInteraction {
  private static TestCouldNotBeAssignedReason = "TestCouldNotBeAssigned";

  private readonly iteratingScenarioAssigner: IteratingScenarioAssigner;
  private readonly totalScenarios: number;

  constructor(readonly scenarios: Scenario[] | Scenario) {
    const validationResult = validateAndEnrichScenario(scenarios);
    if (validationResult.error) {
      throw validationResult.error;
    }

    this.iteratingScenarioAssigner = new IteratingScenarioAssigner(
      validationResult.scenarios
    );
    this.totalScenarios = validationResult.scenarios.length;
  }

  /**
   * Called by IVR Tester when the server has started and is about to issue the
   * request for the calls to be made
   */
  public onReady() {
    const testRunnerManager = createTestRunnerManager();
    this.pluginManager.initialise(testRunnerManager.testRunner);
  }

  public callConnected(call: Call, callTranscriber: CallTranscriber): void {
    const assignResult = this.iteratingScenarioAssigner.assign();
    if (assignResult.isAssigned === false) {
      call.close(ScenarioTest.TestCouldNotBeAssignedReason);
      return;
    }

    const callFlowTest = orderedScenarioStepsTest(assignResult.scenario.steps);
    callFlowTest.runAgainstCallFlow(callTranscriber, call);

    this.emit("testStarted", { testSession });

    // return {
    //   call,
    //   scenario,
    //   callFlowTestSession,
    // };
  }

  getNumberOfCallsToMake(): number {
    return this.totalScenarios;
  }
}
