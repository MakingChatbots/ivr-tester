# IVR Tester

[![npm](https://img.shields.io/npm/v/ivr-tester)](https://www.npmjs.com/package/ivr-tester)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SketchingDev/ivr-tester.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SketchingDev/ivr-tester/context:javascript)
![](https://github.com/SketchingDev/ivr-tester/workflows/On%20Push/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester?ref=badge_shield)

<p align="center">
  Automate the testing of your IVR call flows!
</p>

IVR Tester automates the testing of IVR flows by calling them, interpreting prompts and replying with DTMF tones based
on fluent test definitions.

Features:
* Fully automate testing call flows
* Fluent test definitions that document the call flow
* Flexible conditions for interpreting prompts
* Record call to audio file for manual inspection on failures
* Record transcriptions to file
* Plugin architecture 
* Supports Google Speech-to-Text and AWS Transcript for transcribing calls
* Runs on NodeJS  
* TypeScript type definitions
* Open-source

---

<p align="center">WORK IN PROGRESS</p>

---

```typescript
const config = { transcriber: googleSpeechToText({ languageCode: "en-GB" }) };

testRunner(config)(
  { from: "0123 456 789", to: "0123 123 123" },
  {
    name: "Customer is provided a menu after their account number confirmed",
    instructions: inOrder([
      {
        whenPrompt: similarTo("Please enter your account number"),
        then: press("184748"),
        silenceAfterPrompt: 3000,
        timeout: 6000,
      },
      {
        whenPrompt: similarTo(
          "press 1 for booking a repair or 2 for changing your address"
        ),
        then: hangUp(),
        silenceAfterPrompt: 3000,
        timeout: 6000,
        },
     ]),
  }
);
```

## Quick Start

1. [Create a Twilio account](https://www.twilio.com/referral/9E7LvU) (referral link for $10 free if you upgrade), load it with money and rent a phone number
   1. Store an [authentication token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) in environment variables:
   ```shell
   export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   export TWILIO_AUTH_TOKEN=your_auth_token
   ```
1. Configure your environment for either [Google](packages/transcriber-google-speech-to-text) or [Amazon's](packages/transcriber-amazon-transcribe) transcription service
1. Install and start ngrok
   ```shell
   npm install ngrok -g
   ngrok http 8080
   ```
1. Run the tests
   ```shell
   # Local port that IVR Tester will listen on
   export LOCAL_SERVER_PORT=8080
   # URL that ngrok exposes to the outside world
   export PUBLIC_SERVER_URL=$(curl -s localhost:4040/api/tunnels | jq -r .tunnels[0].public_url)
   
   node test.js
   ```

## How it works

<p align="center">
  <img src="doc/assets/flow.jpg">
</p>

Under the hood this orchestrates: 
 1. Establishing a bi-directional audio stream of the call to the IVR flow - using [Twilio](https://www.twilio.com/)
 1. Transcribing the voice responses from the flow - using [Google Speech-to-Text](https://cloud.google.com/speech-to-text)
 1. Using the test to conditionally respond with DTMF tones to transcripts

## Getting Started

The first 3 steps take you through configuring IVR Tester's dependencies, which are:
* [Twilio](https://www.twilio.com/) - This calls your IVR flow and connects the bi-directional audio stream to the server IVR Tester hosts on the
machine it runs on
* [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text) - This performs the speech-to-text conversion
* [ngrok](https://ngrok.com/) - Run locally this exposes IVR Tester's server to the internet so Twilio can access it

1. Configure your [authentication token for Twilio](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them)
   
   _These are used to instructing Twilio to call your IVR flow.
   Remember to [keep your auth token secret](https://www.twilio.com/blog/protect-phishing-auth-token-fraud)._
   
   ```shell
   export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   export TWILIO_AUTH_TOKEN=your_auth_token
   ```

2. Choose a transcriber

   The call's audio needs to be transcribed so that the tests can recognise what is being said. Follow the transcriber's
   README to set it up:
   * [Google's Speech-to-Text](packages/transcriber-google-speech-to-text)
   * [Amazon Transcribe](packages/transcriber-amazon-transcribe)

3. Start [ngrok](https://ngrok.com/)

   1. [Install ngrok](https://ngrok.com/download)
   2. Run ngrok - we'll only be using its basic features, so you don't need to signup
       ```shell
       ngrok http 8080
       ```
   
2. Run the tests

   1. Set the port IVR Tester should listen on for calls. This is the port that you told ngrok to forward connections
      to in step 3.2 above 
      ```shell
      export LOCAL_SERVER_PORT=8080
      ```
   2. Set the public URL that ngrok created for us in step 3.2 above. We can use it's API to retrieve this for us,
      otherwise it will be available in ngrok's console output
      ```shell
      export PUBLIC_SERVER_URL=$(curl -s localhost:4040/api/tunnels | jq -r .tunnels[0].public_url)
      ```
   3. Execute your test
      ```
      node test.js
      ```

## Writing tests

| When         | Overview                             |
| -------------|--------------------------------------|
| [contains]   | Prompt contains a piece of text      |
| [matches]    | Prompt matches regular expression    |
| [similarTo]  | Prompt is similar to a piece of text |
| [isAnything] | Prompt can be anything               |

[contains]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_when_contains_.md
[matches]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_when_matches_.md
[similarTo]:  ./packages/ivr-tester/doc/modules/_testing_test_conditions_when_similarto_.md
[isAnything]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_when_isanything_.md

| Then        | Overview            |
| ------------|---------------------|
| [press]     | Produces DTMF tones |
| [hangUp]    | Terminates the call |
| [doNothing] | Doesn't do anything |

[press]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_then_press_.md
[hangUp]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_then_hangup_.md
[doNothing]: ./packages/ivr-tester/doc/modules/_testing_test_conditions_then_donothing_.md

## Development

### Documentation

Where possible the documentation is generated from the code using the following script in the root directory or
individual packages:

```shell
yarn docs
```

The documentation is automatically generated and committed as part of the CI pipeline when merged to the main branch.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester?ref=badge_large)

