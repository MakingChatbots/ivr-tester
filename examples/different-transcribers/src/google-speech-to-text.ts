import {
  CallFlowTestDefinition,
  Config,
  contains,
  doNothing,
  inOrder,
  isAnything,
  press,
  similarTo,
  testRunner,
  TestSubject,
} from "ivr-tester";
import path from "path";
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: TestSubject = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const tests: CallFlowTestDefinition[] = [
  {
    name: "Keys pressed are read back",
    instructions: inOrder([
      {
        whenPrompt: isAnything(),
        then: press("1"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("0123456789"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: contains("you entered the values 0123456789"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
      },
    ]),
  },
  {
    name: "API call with short latency",
    instructions: inOrder([
      {
        whenPrompt: isAnything(),
        then: press("3"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: similarTo(
          "please wait while we search for your phone number on our system"
        ),
        then: doNothing(),
        silenceAfterPrompt: 1500,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("123"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: similarTo("you entered the values 123"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
      },
    ]),
  },
  {
    name: "API call with long latency",
    instructions: inOrder([
      {
        whenPrompt: isAnything(),
        then: press("4"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: similarTo(
          "please wait while we search for your phone number on our system"
        ),
        then: doNothing(),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("123"),
        silenceAfterPrompt: 3000,
      },
      {
        whenPrompt: similarTo("you entered the values 123"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
      },
    ]),
  },
];

const config: Config = {
  transcriber: googleSpeechToText({
    languageCode: "en-GB",
    speechPhrases: ["you entered the values", "you timed out"],
    useEnhanced: true,
  }),
  recording: {
    outputPath: path.join(__dirname, "../recordings"),
  },
  completeTranscriptionTimeoutInMs: 3000,
};

testRunner(config)(call, tests)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
