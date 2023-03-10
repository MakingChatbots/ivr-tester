# Google Speech-to-Text Transcriber

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-google-speech-to-text)](https://www.npmjs.com/package/ivr-tester-transcriber-google-speech-to-text)

A plugin for [IVR Tester](https://github.com/SketchingDev/ivr-tester) to transcribe IVR call flows using
[Google Speech-to-Text](https://cloud.google.com/speech-to-text).

## Installation

Install using yarn:

```shell
yarn add ivr-tester-transcriber-google-speech-to-text
```

Or npm:

```shell
npm install ivr-tester-transcriber-google-speech-to-text
```

## Configuration

### Setup GCP project and credentials

Follow GCP's [quick-start guide](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries) to:
1. Setup a Google Cloud project
2. Enable the Google Speech-to-Text service
3. Create a service account
4. Create then download a JSON key-file for the service account
5. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the JSON key-file

```shell
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

### Usage

See the [API's documentation](./doc/modules/_index_.md) for details of each parameter.

```typescript
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

const config: Config = {
  transcriber: googleSpeechToText({ languageCode: "en-GB" })
};
```

#### Speech Adaptation

The plugin exposes two properties that allow you to improve the accuracy of transcriptions:

* `useEnhanced` - Whether to use an [enhanced model](https://cloud.google.com/speech-to-text/docs/enhanced-models)
  for speech recognition if it is available for the language code provided. Beware this costs more!
* `speechPhrases` - Allows you to specify specific words or phrases used more frequently within the speech. See
  [Google's guide for more info on what to provide](https://cloud.google.com/speech-to-text/docs/speech-adaptation).

```typescript
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

const config: Config = {
  transcriber: googleSpeechToText(
    {
      languageCode: "en-GB",
      useEnhanced: true,
      speechPhrases: ["balance", "costing", "financial services"]
    }
  ),
};
```

## Debugging

Console logging can be enabled by specifying the
[package name in the `DEBUG` environment variable](https://github.com/visionmedia/debug#environment-variables):

```
DEBUG=ivr-tester-transcriber-google-speech-to-text
DEBUG_DEPTH=5
```
