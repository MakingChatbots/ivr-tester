import { contains, doNothing, isAnything, press, Scenario } from "ivr-tester";

export interface JsonScenario {
  name: string;
  steps: {
    whenPrompt: {
      type: string;
      value?: string;
    };
    then: { type: string; value?: string };
    silenceAfterPrompt: number;
    timeout: number;
  }[];
}

export function scenarioConverter(scenario: unknown): Scenario {
  return {
    name: "Keys pressed are read back",
    steps: [
      {
        whenPrompt: isAnything(),
        then: press("1"),
        silenceAfterPrompt: 2000,
        timeout: 4000,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("0123456789"),
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
      {
        whenPrompt: contains("you entered the values 0123456789"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
        timeout: 4000,
      },
    ],
  };
}
