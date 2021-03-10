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

const timeout = 6000;

const tests: CallFlowTestDefinition[] = [
  {
    name: "Keys pressed are read back",
    instructions: inOrder([
      {
        whenPrompt: isAnything(),
        then: press("1"),
        silenceAfterPrompt: 3000,
        timeout,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("0123456789"),
        silenceAfterPrompt: 3000,
        timeout,
      },
      {
        whenPrompt: contains("you entered the values 0123456789"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
        timeout,
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
        timeout,
      },
      {
        whenPrompt: similarTo(
          "please wait while we search for your phone number on our system"
        ),
        then: doNothing(),
        silenceAfterPrompt: 1500,
        timeout,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("123"),
        silenceAfterPrompt: 3000,
        timeout,
      },
      {
        whenPrompt: similarTo("you entered the values 123"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
        timeout,
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
        timeout,
      },
      {
        whenPrompt: similarTo(
          "please wait while we search for your phone number on our system"
        ),
        then: doNothing(),
        silenceAfterPrompt: 3000,
        timeout,
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("123"),
        silenceAfterPrompt: 3000,
        timeout,
      },
      {
        whenPrompt: similarTo("you entered the values 123"),
        then: doNothing(),
        silenceAfterPrompt: 3000,
        timeout,
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
    audio: {
      outputPath: path.join(__dirname, "../recordings"),
    },
    transcript: {
      outputPath: path.join(__dirname, "../recordings"),
      includeResponse: true,
    },
  },
};

testRunner(config)(call, tests)
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
