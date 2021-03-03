import {
  Config,
  contains,
  doNothing,
  inOrder,
  isAnything,
  IvrTest,
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

const tests: IvrTest[] = [
  // {
  //   name: "Keys pressed are read back",
  //   test: inOrder([
  //     {
  //       whenPrompt: isAnything(),
  //       then: press("1"),
  //     },
  //     {
  //       whenPrompt: contains("please enter a number"),
  //       then: press("0123456789"),
  //     },
  //     {
  //       whenPrompt: contains("you entered the values 0123456789"),
  //       then: doNothing(),
  //     },
  //   ]),
  // },
  // {
  //   name: "API call with short latency",
  //   test: inOrder([
  //     {
  //       whenPrompt: isAnything(),
  //       then: press("3"),
  //     },
  //     {
  //       whenPrompt: similarTo(
  //         "please wait while we search for your phone number on our system"
  //       ),
  //       then: doNothing(),
  //     },
  //     {
  //       whenPrompt: contains("please enter a number"),
  //       then: press("123"),
  //     },
  //     {
  //       whenPrompt: similarTo("you entered the values 123"),
  //       then: doNothing(),
  //     },
  //   ]),
  // },
  {
    name: "API call with long latency",
    test: inOrder([
      {
        whenPrompt: isAnything(),
        then: press("4"),
      },
      {
        whenPrompt: similarTo(
          "please wait while we search for your phone number on our system"
        ),
        then: doNothing(),
      },
      {
        whenPrompt: contains("please enter a number"),
        then: press("123"),
      },
      {
        whenPrompt: similarTo("you entered the values 123"),
        then: doNothing(),
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
