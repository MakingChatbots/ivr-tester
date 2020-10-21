import {
  Config,
  contains,
  doNothing,
  IvrTest,
  mulawGoogleSpeechToText,
  ordered,
  press,
  testRunner,
  TestSubject,
} from "ivr-tester";
import path from "path";

const call: TestSubject = {
  from: "xx",
  to: "xx",
};

const test: IvrTest = {
  name: "Pressing 4 exits the flow", // TODO Enforce that test names are defined and unique
  test: ordered([
    {
      when: contains("this will allow you to adjust call recording behaviour"),
      then: press("4"),
    },
    {
      when: contains("thanks for calling"),
      then: doNothing(),
    },
  ]),
};

const config: Config = {
  transcriber: mulawGoogleSpeechToText(),
  recording: {
    outputPath: path.join(__dirname, "../recordings"),
  },
};

testRunner(config)(call, test);
