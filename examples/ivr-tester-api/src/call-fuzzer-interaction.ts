import {
  CallFuzzerInteraction,
  Config,
  IvrNumber,
  IvrTester,
} from "ivr-tester";
import path from "path";
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";
import ngrok from "ngrok";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const call: IvrNumber = {
  from: process.env.FROM_PHONE_NUMBER,
  to: process.env.TO_PHONE_NUMBER,
};

const config: Config = {
  localServerPort: 8080,
  twilioAuth: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  transcriber: googleSpeechToText({
    languageCode: "en-GB",
  }),
  recording: {
    audio: {
      outputPath: path.join(__dirname, "../recordings"),
    },
  },
};

function catchError(err: Error) {
  if (err) console.error(err);
  process.exit(1);
}

ngrok
  .connect(config.localServerPort)
  .then((url) => {
    return new IvrTester(
      { ...config, publicServerUrl: url },
      new CallFuzzerInteraction()
    )
      .run(call)
      .then(() => process.exit())
      .catch(catchError);
  })
  .catch(catchError);
