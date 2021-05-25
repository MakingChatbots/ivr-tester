import {
  Config,
  doNothing,
  isAnything,
  IvrNumber,
  IvrTester,
  press,
  Scenario,
} from "ivr-tester";
import path from "path";
import { amazonTranscribe } from "ivr-tester-transcriber-amazon-transcribe";
import ngrok from "ngrok";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: IvrNumber = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const timeout = 6000;

const scenario: Scenario = {
  name: "Keys pressed are read back",
  steps: [
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
  ],
};

const config: Config = {
  localServerPort: 8080,
  twilioAuth: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  transcriber: amazonTranscribe({ region: "us-east-1", languageCode: "en-GB" }),
  recording: {
    audio: {
      outputPath: path.join(__dirname, "../../recordings"),
    },
    transcript: {
      outputPath: path.join(__dirname, "../../recordings"),
      includeResponse: false,
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
