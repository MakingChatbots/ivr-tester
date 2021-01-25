**[Amazon Transcribe Transcriber](../README.md)**

> [Globals](../README.md) / "index"

# Module: "index"

## Index

### Interfaces

* [AmazonTranscribeOptions](../interfaces/_index_.amazontranscribeoptions.md)

### Functions

* [amazonTranscribe](_index_.md#amazontranscribe)

## Functions

### amazonTranscribe

▸ `Const`**amazonTranscribe**(`__namedParameters`: { languageCode: LANGUAGES = "en-US"; region: AVAILABLE\_REGIONS  }): TranscriberFactory

*Defined in [transcriber-amazon-transcribe/src/index.ts:25](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/index.ts#L25)*

Factory for creating an Amazon Transcribe transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { languageCode: LANGUAGES = "en-US"; region: AVAILABLE\_REGIONS  } |

**Returns:** TranscriberFactory
