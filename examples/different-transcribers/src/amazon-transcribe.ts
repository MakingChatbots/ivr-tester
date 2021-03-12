import {
  CallFlowTestDefinition,
  Config,
  doNothing,
  inOrder,
  isAnything,
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

const timeout = 6000;

const test: CallFlowTestDefinition = {
  name: "Keys pressed are read back",
  instructions: inOrder([
    {
      whenPrompt: isAnything(),
      then: press("1"),
      silenceAfterPrompt: 3000,
      timeout,
    },
    {
      whenPrompt: isAnything(),
      then: press("0123456789"),
      silenceAfterPrompt: 3000,
      timeout,
    },
    {
      whenPrompt: isAnything(),
      then: doNothing(),
      silenceAfterPrompt: 3000,
      timeout,
    },
  ]),
};

const config: Config = {
  transcriber: amazonTranscribe({ region: "us-east-1", languageCode: "en-GB" }),
  recording: {
    audio: {
      outputPath: path.join(__dirname, "../recordings"),
    },
    transcript: {
      outputPath: path.join(__dirname, "../recordings"),
      includeResponse: false,
      filename: "transcription-aws",
    },
  },
};

testRunner(config)(call, test)
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
