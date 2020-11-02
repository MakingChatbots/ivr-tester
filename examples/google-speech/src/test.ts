import {
  Config,
  contains,
  doNothing,
  IvrTest,
  ordered,
  press, similarTo,
  testRunner,
  TestSubject,
} from "ivr-tester";
import path from "path";

require("dotenv").config();

const call: TestSubject = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const test: IvrTest = {
  name: "Pressing 4 exits the flow",
  test: inOrder([
    {
      whenTranscript: contains("this will allow you to adjust call recording behaviour"),
      then: press("4"),
    },
    {
      whenTranscript: hasPart(similarTo("thanks for calling")),
      then: doNothing(),
    },
  ]),
};

const config: Config = {
  recording: {
    outputPath: path.join(__dirname, "../recordings"),
  },
};

testRunner(config)(call, test);
