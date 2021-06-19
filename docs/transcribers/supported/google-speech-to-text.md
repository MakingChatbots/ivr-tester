# Google Speech-to-Text Transcriber

A plugin for [IVR Tester](https://github.com/SketchingDev/ivr-tester) to transcribe IVR call flows using
[Google Speech-to-Text](https://cloud.google.com/speech-to-text).

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-google-speech-to-text)](https://www.npmjs.com/package/ivr-tester-transcriber-google-speech-to-text)

## Installation

### 1. Install the package

Install using yarn:

```shell
yarn global add ivr-tester-transcriber-google-speech-to-text
```

Or npm:

```shell
npm install -g ivr-tester-transcriber-google-speech-to-text
```

### 2. Setup Google Speech-to-Text

Follow Google Cloud Platform's [quick-start guide](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries) to:
1. Setup a Google Cloud project
2. Enable the Google Speech-to-Text service
3. Create a service account
4. Create then download a JSON key-file for the service account
5. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the JSON key-file

```shell
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

## Configuration

* `languageCode` - Language of the speech to transcribe - [list of available languages](https://cloud.google.com/speech-to-text/docs/languages)
* `useEnhanced` - Whether to use an [enhanced model](https://cloud.google.com/speech-to-text/docs/enhanced-models)
  if it is available for the language code provided. Beware this costs more!
* `speechPhrases` - Specific words or phrases used more frequently within the speech. See
  [Google's guide for more info on what to provide](https://cloud.google.com/speech-to-text/docs/speech-adaptation)

## Usage

### CLI

Create the following block within your configuration file, adjusting the `options` property based on your needs:

```json
{
    "transcriber": {
        "name": "google-speech-to-text",
        "options": {
            "languageCode": "en-GB",
            "useEnhanced": true,
            "speechPhrases": [
                "Press 1 for playback flow",
                "Press 2 for long pauses flow",
                "Press 3 for short latency flow",
                "Press 4 for long latency flow",
                "Please enter a number",
                "You entered the values 0123456789. Thank you."
            ]
        }
    }
}
```

### Programmable interface

```typescript
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

const config: Config = {
    transcriber: googleSpeechToText(
        {
            languageCode: "en-GB",
            useEnhanced: true,
            speechPhrases: ["balance", "costing", "financial services"]
        }
    )
};
```

See the [API's documentation](https://github.com/SketchingDev/ivr-tester/tree/main/packages/transcriber-google-speech-to-text/doc) for details of each parameter.

## Development

The code is part of [IVR Tester's GitHub repository](https://github.com/SketchingDev/ivr-tester/tree/main/packages/transcriber-google-speech-to-text).

### Debugging

Console logging can be enabled by specifying the
[package name in the `DEBUG` environment variable](https://github.com/visionmedia/debug#environment-variables):

```shell
DEBUG=ivr-tester-transcriber-google-speech-to-text
DEBUG_DEPTH=5
```
