**[Google Speech-to-Text Transcriber](../README.md)**

> [Globals](../README.md) / "index"

# Module: "index"

## Index

### Interfaces

* [GoogleSpeechToTextOptions](../interfaces/_index_.googlespeechtotextoptions.md)

### Functions

* [googleSpeechToText](_index_.md#googlespeechtotext)

## Functions

### googleSpeechToText

▸ `Const`**googleSpeechToText**(`__namedParameters`: { languageCode: string = "en-US"; speechPhrases: string[] = []; useEnhanced: boolean = false }, `speechClient?`: SpeechClient): TranscriberFactory

*Defined in [packages/transcriber-google-speech-to-text/src/index.ts:37](https://github.com/SketchingDev/ivr-tester/blob/86cd37b/packages/transcriber-google-speech-to-text/src/index.ts#L37)*

Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { languageCode: string = "en-US"; speechPhrases: string[] = []; useEnhanced: boolean = false } | - |
`speechClient` | SpeechClient | new SpeechClient() |

**Returns:** TranscriberFactory
