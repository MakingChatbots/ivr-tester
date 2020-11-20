import {
  Config,
  contains,
  doNothing,
  hasPart,
  inOrder,
  IvrTest,
  press,
  similarTo,
  testRunner,
  TestSubject,
} from "ivr-tester";
import path from "path";
import { amazonTranscribe } from "ivr-tester-transcriber-amazon-transcribe";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: TestSubject = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const test: IvrTest = {
  name: "Pressing 4 exits the flow",
  test: inOrder([
    {
      whenTranscript: contains(
        "will allow you to adjust call recording behaviour"
      ),
      then: press("4"),
    },
    {
      whenTranscript: hasPart(similarTo("thanks for calling")),
      then: doNothing(),
    },
  ]),
};

const config: Config = {
  transcriber: amazonTranscribe("us-east-1", "en-GB"),
  recording: {
    outputPath: path.join(__dirname, "../recordings"),
  },
};

testRunner(config)(call, test);
