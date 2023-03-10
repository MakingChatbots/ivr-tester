# IVR Tester

IVR Tester automates the testing of IVR flows by calling them then navigating menus and prompts using touch-tones, as if
it was a real customer.

---

**This documentation is under active development. Expect more in the coming weeks.**

---

[![npm](https://img.shields.io/npm/v/ivr-tester)](https://www.npmjs.com/package/ivr-tester)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SketchingDev/ivr-tester.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SketchingDev/ivr-tester/context:javascript)
![](https://github.com/SketchingDev/ivr-tester/workflows/On%20Push/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSketchingDev%2Fivr-tester?ref=badge_shield)

<p align="center">
  <img src="_images/demo.gif">
</p>

Features:

* Fully automates testing call flows
* Test multiple scenarios in parallel
* Expressive test definitions help document call flow
* Record audio of tests
* Record transcriptions of tests
* Supports Google Speech-to-Text and AWS Transcript for transcribing calls
* Open-source

## Installation

1. Download and install NodeJS - https://nodejs.org/en/download/

2. Install IVR Tester
   ```shell
   npm install -g ivr-tester-cli
   ```

3. Buy a phone number from Twilio

   Twilio is used for calling the flow under test. Follow the steps to buy a phone number and
   configure your environment to allow IVR Tester to use it:

    1. [Create a Twilio account](https://www.twilio.com/referral/9E7LvU) (referral link to get $10 free when you upgrade
       and support the development of this tool)
    2. [Buy a phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console)
    3. Store
       an [authentication token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them)
       in environment variables:
       ```shell
       export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
       export TWILIO_AUTH_TOKEN=your_auth_token
       ```

4. Configure a transcription service

   IVR Tester 'understands' prompts spoken by a call flow by transcribing them using any of the services below. Each
   transcriber has different requirements, so please refer to their installation instructions.

   [List of supported transcribers](/?id=supported-transcribers)

## Usage

### Scenarios

```json
{
    "name": "Keys pressed are read back",
    "steps": [
        {
            "whenPrompt": {
                "type": "isAnything"
            },
            "then": {
                "type": "press",
                "value": "1"
            },
            "silenceAfterPrompt": 2000,
            "timeout": 6000
        },
        {
            "whenPrompt": {
                "type": "contains",
                "value": "please enter a number"
            },
            "then": {
                "type": "press",
                "value": "0123456789"
            },
            "silenceAfterPrompt": 3000,
            "timeout": 6000
        },
        {
            "whenPrompt": {
                "type": "contains",
                "value": "you entered the values 0123456789"
            },
            "then": {
                "type": "doNothing"
            },
            "silenceAfterPrompt": 3000,
            "timeout": 6000
        }
    ]
}

```

### Configuration

```json
{
    "transcriber": {
        "name": "google-speech-to-text",
        "options": {
            "languageCode": "en-GB",
            "useEnhanced": true
        }
    },
    "recording": {
        "transcript": {
            "outputPath": "./recordings"
        }
    }
}

```

## Programmable interface

### Usage

#### Scenarios

#### Config

```typescript
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
```

##### Recordings

The call's inbound audio stream (8k mono uLaw) can be saved to a file to allow you to listen to the call after the test
completes. However, since the audio file is header-less most audio players won't be able to open it directly so you either
have to use an audio player that allows you to specify the type of audio file, or convert the file to something else...

**Opening the file with [Audacity](https://www.audacityteam.org/)**

1. File > Import > Raw Data...
2. Provide following in 'Import Raw Data' window
    * Encoding: U-Law
    * Byte-order: Little-endian
    * Channels: 1 Channel (Mono)
    * Start offset: 0
    * Amount to import: 100%
    * Sample Rate: 8000Hz
3. Import

**Converting to a wave file**

Using [SoX](http://sox.sourceforge.net/) you can convert a recording with the command:

```shell
sox -r 8000 -t raw -e u-law -c 1 -b 8 input.raw -t wav output.wav
```

Or convert a directory with:

```shell
#!/bin/bash

# ./convert-recordings.sh recordings/

FILES="$@/*.raw"
for f in $FILES
do
  echo "Converting $f"
  sox -r 8000 -t raw -e u-law -c 1 -b 8 "$f" -t wav "$f.wav"
done
```

## Transcribers

### Supported

* [Google Speech-to-Text Plugin](/transcribers/supported/google-speech-to-text.md)

### Creating an integration

Follow the [guide for integrating an unsupported transcriber](/transcribers/creating-a-transcriber-integration.md).
