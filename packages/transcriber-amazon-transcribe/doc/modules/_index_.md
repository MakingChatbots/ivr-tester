**[Amazon Transcribe Transcriber](../README.md)**

> [Globals](../README.md) / "index"

# Module: "index"

## Index

### Functions

* [amazonTranscribe](_index_.md#amazontranscribe)

## Functions

### amazonTranscribe

▸ `Const`**amazonTranscribe**(`region`: AVAILABLE\_REGIONS, `languageCode`: LANGUAGES): TranscriberFactory

*Defined in [packages/transcriber-amazon-transcribe/src/index.ts:13](https://github.com/SketchingDev/ivr-tester/blob/f35425d/packages/transcriber-amazon-transcribe/src/index.ts#L13)*

Factory for creating an Amazon Transcribe transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`region` | AVAILABLE\_REGIONS | AWS region |
`languageCode` | LANGUAGES | Language of the supplied audio as a BCP-47 language tag. |

**Returns:** TranscriberFactory

Factory for creating an Amazon Transcribe transcriber
