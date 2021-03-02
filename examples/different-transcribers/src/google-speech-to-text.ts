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
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: TestSubject = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const tests: IvrTest[] = [
  {
    name: "Keys pressed are read back",
    test: inOrder([
      {
        whenPrompt: contains("please enter a number"),
        then: press("0w1w2w3w4w5w6w7w8w9"),
      },
      {
        whenPrompt: contains("you entered the values 0123456789"),
        then: doNothing(),
      },
    ]),
  },
  {
    name: "Times out when keys not pressed",
    test: inOrder([
      {
        whenPrompt: contains("please enter a number"),
        then: doNothing(),
      },
      {
        whenPrompt: contains("you timed out"),
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
};

testRunner(config)(call, tests)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
