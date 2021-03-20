Amazon Transcribe Transcriber

# Amazon Transcribe Transcriber

## Table of contents

### Interfaces

- [AmazonTranscribeOptions](interfaces/amazontranscribeoptions.md)

### Functions

- [amazonTranscribe](README.md#amazontranscribe)

## Functions

### amazonTranscribe

▸ `Const`**amazonTranscribe**(`__namedParameters`: [*AmazonTranscribeOptions*](interfaces/amazontranscribeoptions.md)): TranscriberFactory

Factory for creating an Amazon Transcribe transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*AmazonTranscribeOptions*](interfaces/amazontranscribeoptions.md) |

**Returns:** TranscriberFactory

Defined in: [index.ts:25](https://github.com/SketchingDev/ivr-tester/blob/2dd1912/packages/transcriber-amazon-transcribe/src/index.ts#L25)
