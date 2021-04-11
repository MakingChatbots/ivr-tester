export interface JsonWhen {
  type: string;
  value?: string;
}

export interface JsonThen {
  type: string;
  value?: string;
}

export interface JsonStep {
  whenPrompt: JsonWhen;
  then: JsonThen;
  silenceAfterPrompt: number;
  timeout: number;
}

export interface JsonScenario {
  name: string;
  steps: JsonStep[];
}
