Google Speech-to-Text Transcriber

# Google Speech-to-Text Transcriber

## Table of contents

### Interfaces

- [GoogleSpeechToTextOptions](interfaces/googlespeechtotextoptions.md)

### Functions

- [googleSpeechToText](README.md#googlespeechtotext)

## Functions

### googleSpeechToText

▸ `Const`**googleSpeechToText**(`__namedParameters?`: [*GoogleSpeechToTextOptions*](interfaces/googlespeechtotextoptions.md), `speechClient?`: *SpeechClient*): TranscriberFactory

Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*GoogleSpeechToTextOptions*](interfaces/googlespeechtotextoptions.md) |
`speechClient` | *SpeechClient* |

**Returns:** TranscriberFactory

Defined in: [index.ts:36](https://github.com/SketchingDev/ivr-tester/blob/2dd1912/packages/transcriber-google-speech-to-text/src/index.ts#L36)
