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
