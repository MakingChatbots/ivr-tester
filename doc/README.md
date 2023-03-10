Google Speech-to-Text Transcriber

# Google Speech-to-Text Transcriber

## Table of contents

### References

- [default](README.md#default)

### Interfaces

- [GoogleSpeechToTextOptions](interfaces/GoogleSpeechToTextOptions.md)

### Functions

- [googleSpeechToText](README.md#googlespeechtotext)

## References

### default

Renames and re-exports [googleSpeechToText](README.md#googlespeechtotext)

## Functions

### googleSpeechToText

▸ **googleSpeechToText**(`«destructured»?`, `speechClient?`): `TranscriberFactory`

Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GoogleSpeechToTextOptions`](interfaces/GoogleSpeechToTextOptions.md) |
| `speechClient` | `SpeechClient` |

#### Returns

`TranscriberFactory`

#### Defined in

[index.ts:36](https://github.com/SketchingDev/ivr-tester/blob/437666c/packages/transcriber-google-speech-to-text/src/index.ts#L36)
