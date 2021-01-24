import {
  Config,
  contains,
  doNothing,
  inOrder,
  IvrTest,
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

const test: IvrTest = {
  name: "Keys pressed are read back",
  test: inOrder([
    {
      whenPrompt: contains("please enter a number"),
      then: press("0w1w2w3w4w5w6w7w8w9"),
    },
    {
      whenPrompt: contains(["you entered", "0123456789"]),
      then: doNothing(),
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
  .catch(() => process.exit(1));
