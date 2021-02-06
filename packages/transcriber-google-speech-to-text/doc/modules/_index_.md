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

▸ `Const`**googleSpeechToText**(`__namedParameters?`: { languageCode: string = "en-US"; speechPhrases: string[] = []; useEnhanced: boolean = false }, `speechClient?`: SpeechClient): TranscriberFactory

*Defined in [transcriber-google-speech-to-text/src/index.ts:36](https://github.com/SketchingDev/ivr-tester/blob/2e93db6/packages/transcriber-google-speech-to-text/src/index.ts#L36)*

Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { languageCode: string = "en-US"; speechPhrases: string[] = []; useEnhanced: boolean = false } | {} |
`speechClient` | SpeechClient | new SpeechClient() |

**Returns:** TranscriberFactory
