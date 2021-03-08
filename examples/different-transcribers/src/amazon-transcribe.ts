import {
  CallFlowTestDefinition,
  Config,
  contains,
  doNothing,
  inOrder,
  press,
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

const test: CallFlowTestDefinition = {
  name: "Keys pressed are read back",
  instructions: inOrder([
    {
      whenPrompt: contains("please enter a number"),
      then: press("0123456789"),
      silenceAfterPrompt: 3000,
    },
    {
      whenPrompt: contains(["you entered", "0123456789"]),
      then: doNothing(),
      silenceAfterPrompt: 3000,
    },
  ]),
};

const config: Config = {
  transcriber: amazonTranscribe({ region: "us-east-1", languageCode: "en-GB" }),
  recording: {
    outputPath: path.join(__dirname, "../recordings"),
  },
};

testRunner(config)(call, test)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
