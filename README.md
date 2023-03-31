# IVR Tester

IVR Tester is an open-source and extensible library for automating IVR testing

---
[![npm](https://img.shields.io/npm/v/ivr-tester)](https://www.npmjs.com/package/ivr-tester)
![](https://github.com/SketchingDev/ivr-tester/workflows/On%20Push/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester?ref=badge_shield)
---

Here's it phoning an IVR phone line and interacting as if it were a customer: 
<p align="center">
  <img src="doc/assets/demo.gif">
</p>

Features:
* Fully automates testing call flows
* Test multiple scenarios in parallel
* Expressive test definitions help document call flow
* Record audio of tests
* Record transcriptions of tests
* Supports Google Speech-to-Text and AWS Transcript for transcribing calls
* Open-source

## What can it do

IVR Tester comes with built-in extensible components called 'Interactors' which allows you to decide how it will
interact with a phone number:

### Pretend to be a customer

The [Scenario Test Interactor](./packages/ivr-tester/src/call-interactors/scenario-test/README.md) allows you to define
scenarios that you want tested.

Below is an example the scenario of a customer who is asked to confirm their account number. When executed by IVR
Tester it will:
1. Phone your IVR line
2. Listen for the prompt in the first step
3. Then press `123#`
4. It then moves on to the second step etc

If there is a variation to this scenario then it reports the deviation and stops.

```typescript
const result = await ivrTester.run(
  { from: "0123 456 789", to: "0123 123 123" },
  scenarioTestInteractor({
    scenario: {
      name: 'Scenario times out waiting for prompt',
      steps: [
        {
          whenPrompt: containsSimilarTo('Please enter a number followed by hash'),
          then: press(['1', '2', '3', '#']),
          silenceAfterPrompt: 2000,
          timeout: 5000,
        },
        {
          whenPrompt: containsSimilarTo('you pressed one two three'),
          then: hangUp(),
          silenceAfterPrompt: 1000,
          timeout: 5000,
        },
      ],
    },
    transcriber: googleSpeechToText({ languageCode: "en-GB" })
  })
)
```

### Check the greeting message

The [Greeting Contains Interactor](./packages/ivr-tester/src/call-interactors/greeting-contains/README.md) will listen
for a phrase in the greeting message of an IVR line and hangup as soon as it hears it, otherwise it will hangup after
a predefined amount of time.

This is useful if you want to check a greeting contains a regulatory requirement, or that a phone line greeting is
informing customers that the line is open/closed, as the example below does:

```typescript
const result = await ivrTester.run(
  { from: "0123 456 789", to: "0123 123 123" },
  greetingContainsInteractor({
    maxTimeToListenMs: 5000,
    wordsToListenFor: [
      'recorded', // Open lines say '... all calls are recorded ...'
      'closed' // Closed lines say '... phone line is currently closed ...'
    ],
    transcriber: googleSpeechToText({ languageCode: "en-GB" })
  })
);

expect(result.foundInGreeting).toContain('recorded');
```

## Quick Start

1. [Create a Twilio account](https://www.twilio.com/referral/9E7LvU) (referral link for $10 free if you upgrade), load it with money and rent a phone number
   1. Store an [authentication token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) in environment variables:
   ```shell
   export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   export TWILIO_AUTH_TOKEN=your_auth_token
   ```
2. Configure your environment for either [Google](packages/transcriber-google-speech-to-text) or [Amazon's](packages/transcriber-amazon-transcribe) transcription service
3. Install and start ngrok
   ```shell
   npm install ngrok -g
   ngrok http 8080
   ```
4. Run the tests
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
 2. Transcribing the voice responses from the flow - using [Google Speech-to-Text](https://cloud.google.com/speech-to-text)
 3. Using the test to conditionally respond with DTMF tones to transcripts

## Development

### Documentation

Where possible the documentation is generated from the code using the following script in the root directory or
individual packages:

```shell
yarn docs
```

The documentation is automatically generated and committed as part of the CI pipeline when merged to the main branch.
The official website can be previewed locally by running:

```shell
docsify serve docs
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester?ref=badge_large)
