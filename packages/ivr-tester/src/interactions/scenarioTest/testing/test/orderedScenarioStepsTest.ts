import { Step } from "../../../../configuration/scenario/Step";
import {
  CallFlowTest,
  CallFlowTestSession,
  CallFlowSessionEvents,
} from "./CallFlowTest";
import { setTimeout } from "timers";
import { Call } from "../../../../call/Call";
import { PromptTranscriptionBuilder } from "../../../../call/transcription/PromptTranscriptionBuilder";
import { Emitter, TypedEmitter } from "../../../../Emitter";
import {
  TranscriptEvent,
  TranscriptionEvents,
} from "../../../../call/transcription/plugin/TranscriberPlugin";
import { PostSilencePrompt } from "./PostSilencePrompt";
import { Scenario } from "../../../../configuration/scenario/Scenario";

export interface Prompt {
  readonly definition: Step;
  setNext(prompt: Prompt): Prompt;
  // TODO Refactor PromptTranscriptionBuilder parameter
  transcriptUpdated(transcriptEvent: PromptTranscriptionBuilder): void;
}

export type MatchedCallback = (
  prompt: Prompt,
  transcriptMatched: string
) => void;

export type TimeoutCallback = (prompt: Prompt, transcript: string) => void;

export type PromptFactory = (
  definition: Step,
  call: Call,
  matchedCallback: MatchedCallback,
  timeoutCallback: TimeoutCallback
) => Prompt | undefined;

const postSilencePromptFactory: PromptFactory = (
  definition,
  call,
  matchedCallback,
  timeoutCallback
) =>
  new PostSilencePrompt(
    definition,
    call,
    matchedCallback,
    timeoutCallback,
    setTimeout,
    clearTimeout
  );

class RunningOrderedScenarioStepsCallFlowTest
  extends TypedEmitter<CallFlowSessionEvents>
  implements CallFlowTestSession {
  constructor(
    private readonly promptDefinitions: ReadonlyArray<Step>,
    private readonly promptFactory: PromptFactory,
    private readonly transcriber: Emitter<TranscriptionEvents>,
    private readonly call: Call
  ) {
    super();
    this.initialise();
  }

  private static chainPrompts(prompts: Prompt[]): Prompt {
    const firstPrompt: Prompt = prompts.shift();

    let chain: Prompt = firstPrompt;
    prompts.forEach((item) => {
      chain = chain.setNext(item);
    });

    return firstPrompt;
  }

  // TODO Tidy this
  private initialise(): void {
    const timedOutCallback: TimeoutCallback = (prompt, transcript) => {
      this.emit("timeoutWaitingForMatch", {
        transcription: transcript,
        promptDefinition: prompt.definition,
      });
    };

    const matchedCallback: MatchedCallback = (prompt, transcriptMatched) => {
      this.emit("promptMatched", {
        transcription: transcriptMatched,
        promptDefinition: prompt.definition,
      });
    };
    const lastMatchedCallback: MatchedCallback = (
      prompt,
      transcriptMatched
    ) => {
      matchedCallback(prompt, transcriptMatched);
      this.emit("allPromptsMatched", {});
    };

    const prompts = this.promptDefinitions.map((prompt, index) => {
      const isLastPromptDefinition =
        index === this.promptDefinitions.length - 1;

      const callback = isLastPromptDefinition
        ? lastMatchedCallback
        : matchedCallback;

      return this.promptFactory(prompt, this.call, callback, timedOutCallback);
    });

    const promptChain = RunningOrderedScenarioStepsCallFlowTest.chainPrompts(
      prompts
    );

    const promptTranscriptionBuilder = new PromptTranscriptionBuilder();

    const onTranscription = (event: TranscriptEvent) => {
      if (this.promptDefinitions.length === 0) {
        this.emit("allPromptsMatched", {});
        return;
      }

      promptTranscriptionBuilder.add(event);
      this.emit("progress", {
        transcription: promptTranscriptionBuilder.merge(),
      });

      promptChain.transcriptUpdated(promptTranscriptionBuilder);
    };

    this.transcriber.on("transcription", onTranscription);
  }
}

/**
 * Tests a call flow by asserting that the instructions spoken match an ordered set of steps from a scenario. The call
 * flow is traversed by calling the {@link Step.then} when the prompt from the step is matched.
 */
export function orderedScenarioStepsTest(
  scenarioSteps: Step[],
  promptFactory: PromptFactory = postSilencePromptFactory
): CallFlowTest {
  return {
    runAgainstCallFlow: (
      transcriber: Emitter<TranscriptionEvents>,
      call: Call
    ): CallFlowTestSession =>
      new RunningOrderedScenarioStepsCallFlowTest(
        scenarioSteps,
        promptFactory,
        transcriber,
        call
      ),
  };
}
