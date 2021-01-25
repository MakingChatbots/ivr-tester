**[Amazon Transcribe Transcriber](../README.md)**

> [Globals](../README.md) / ["AmazonTranscribe"](../modules/_amazontranscribe_.md) / AmazonTranscribe

# Class: AmazonTranscribe

## Hierarchy

* TypedEmitter\<TranscriptionEvents>

  ↳ **AmazonTranscribe**

## Implements

* Emitter\<TranscriptionEvents>
* TranscriberPlugin

## Index

### Constructors

* [constructor](_amazontranscribe_.amazontranscribe.md#constructor)

### Properties

* [config](_amazontranscribe_.amazontranscribe.md#config)
* [languageCode](_amazontranscribe_.amazontranscribe.md#languagecode)
* [region](_amazontranscribe_.amazontranscribe.md#region)
* [stream](_amazontranscribe_.amazontranscribe.md#stream)
* [debug](_amazontranscribe_.amazontranscribe.md#debug)

### Methods

* [close](_amazontranscribe_.amazontranscribe.md#close)
* [createStream](_amazontranscribe_.amazontranscribe.md#createstream)
* [emit](_amazontranscribe_.amazontranscribe.md#emit)
* [getStream](_amazontranscribe_.amazontranscribe.md#getstream)
* [off](_amazontranscribe_.amazontranscribe.md#off)
* [on](_amazontranscribe_.amazontranscribe.md#on)
* [transcribe](_amazontranscribe_.amazontranscribe.md#transcribe)
* [transcriptionComplete](_amazontranscribe_.amazontranscribe.md#transcriptioncomplete)
* [convertAudioEncoding](_amazontranscribe_.amazontranscribe.md#convertaudioencoding)

## Constructors

### constructor

\+ **new AmazonTranscribe**(`region`: AVAILABLE\_REGIONS, `languageCode`: LANGUAGES): [AmazonTranscribe](_amazontranscribe_.amazontranscribe.md)

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:23](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`region` | AVAILABLE\_REGIONS |
`languageCode` | LANGUAGES |

**Returns:** [AmazonTranscribe](_amazontranscribe_.amazontranscribe.md)

## Properties

### config

• `Private` `Readonly` **config**: TranscribeStreamConfig

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:21](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L21)*

___

### languageCode

• `Private` `Readonly` **languageCode**: LANGUAGES

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:27](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L27)*

___

### region

• `Private` `Readonly` **region**: AVAILABLE\_REGIONS

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:26](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L26)*

___

### stream

• `Private` **stream**: StreamingClient

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:23](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L23)*

___

### debug

▪ `Static` `Private` `Readonly` **debug**: Debugger = Debugger.getPackageDebugger()

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:19](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L19)*

## Methods

### close

▸ **close**(): void

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:91](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L91)*

**Returns:** void

___

### createStream

▸ `Private`**createStream**(): StreamingClient

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:59](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L59)*

**Returns:** StreamingClient

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TranscriptionEvents[K]): boolean

*Inherited from [AmazonTranscribe](_amazontranscribe_.amazontranscribe.md).[emit](_amazontranscribe_.amazontranscribe.md#emit)*

*Defined in ivr-tester/dist/Emitter.d.ts:13*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<TranscriptionEvents> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | TranscriptionEvents[K] |

**Returns:** boolean

___

### getStream

▸ `Private`**getStream**(): StreamingClient

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:48](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L48)*

**Returns:** StreamingClient

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): TypedEmitter\<TranscriptionEvents>

*Inherited from [AmazonTranscribe](_amazontranscribe_.amazontranscribe.md).[off](_amazontranscribe_.amazontranscribe.md#off)*

*Defined in ivr-tester/dist/Emitter.d.ts:12*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<TranscriptionEvents> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** TypedEmitter\<TranscriptionEvents>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): TypedEmitter\<TranscriptionEvents>

*Inherited from [AmazonTranscribe](_amazontranscribe_.amazontranscribe.md).[on](_amazontranscribe_.amazontranscribe.md#on)*

*Defined in ivr-tester/dist/Emitter.d.ts:11*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<TranscriptionEvents> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** TypedEmitter\<TranscriptionEvents>

___

### transcribe

▸ **transcribe**(`payload`: Buffer): void

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:101](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L101)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void

___

### transcriptionComplete

▸ **transcriptionComplete**(): void

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:106](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L106)*

**Returns:** void

___

### convertAudioEncoding

▸ `Static` `Private`**convertAudioEncoding**(`data`: ArrayLike\<unknown>): Buffer

*Defined in [transcriber-amazon-transcribe/src/AmazonTranscribe.ts:39](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L39)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | ArrayLike\<unknown> |

**Returns:** Buffer
