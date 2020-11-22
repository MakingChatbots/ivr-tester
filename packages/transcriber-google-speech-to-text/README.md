# Google Speech-to-Text Transcriber

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-google-speech-to-text)](https://www.npmjs.com/package/ivr-tester-transcriber-google-speech-to-text)

> Transcriber plugin for using Google Speech-to-Text to transcribe phone-calls.

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
2. Create a service account, then set the environment variable to the path of the JSON file that contains the service
account's key.

```shell
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

### Usage

See the [API documentation](./docs/api.md) for details of each parameter.

```typescript
import { googleSpeechToText } from "ivr-tester-transcriber-google-speech-to-text";

const config: Config = {
  transcriber: googleSpeechToText(
    {
      languageCode: "en-GB",
      speechPhrases: [],
      useEnhanced: true
    }
  ),
};
```
