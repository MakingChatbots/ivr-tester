import { Call } from "../../call/Call";
import { TestResult } from "./TestInstanceClass";
import { Emitter } from "../../Emitter";
import { TranscriptionEvents } from "../../call/transcription/plugin/TranscriberPlugin";
import { setTimeout } from "timers";

// TODO Is there a better name?
export interface TestContainer {
  /**
   * Called each time with a transcript is received
   */
  start(transcriber: Emitter<TranscriptionEvents>, call: Call): TestResult;
}

export interface IvrTest {
  name: string; // TODO Enforce that test names are defined and unique
  test: TestContainer;
}
