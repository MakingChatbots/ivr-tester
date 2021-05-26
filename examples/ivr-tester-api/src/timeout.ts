import {
  Config,
  contains,
  doNothing,
  IvrNumber,
  IvrTester,
  Scenario,
} from "ivr-tester";
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";
import ngrok from "ngrok";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: IvrNumber = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const fiveSecondsInMs = 5000;

const scenario: Scenario = {
  name: "Scenario times out waiting for prompt",
  steps: [
    {
      whenPrompt: contains("this text won't be in the prompt"),
      then: doNothing(),
      silenceAfterPrompt: fiveSecondsInMs * 2,
      timeout: fiveSecondsInMs,
    },
  ],
};

const config: Config = {
  localServerPort: 8080,
  transcriber: googleSpeechToText(),
  twilioAuth: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  recording: {
    transcript: {
      outputPath: path.join(__dirname, "../recordings"),
      includeResponse: true,
    },
  },
};

function catchError(err: Error) {
  if (err) console.error(err);
  process.exit(1);
}

ngrok
  .connect(config.localServerPort)
  .then((url) =>
    new IvrTester({ ...config, publicServerUrl: url })
      .run(call, scenario)
      .then(() => process.exit())
      .catch(catchError)
  )
  .catch(catchError);
