**[Google Speech-to-Text Transcriber](../README.md)**

> [Globals](../README.md) / ["GoogleSpeechToText"](../modules/_googlespeechtotext_.md) / GoogleSpeechToText

# Class: GoogleSpeechToText

## Hierarchy

* TypedEmitter\<TranscriptionEvents>

  ↳ **GoogleSpeechToText**

## Implements

* Emitter\<TranscriptionEvents>
* TranscriberPlugin

## Index

### Constructors

* [constructor](_googlespeechtotext_.googlespeechtotext.md#constructor)

### Properties

* [config](_googlespeechtotext_.googlespeechtotext.md#config)
* [speechClient](_googlespeechtotext_.googlespeechtotext.md#speechclient)
* [stream](_googlespeechtotext_.googlespeechtotext.md#stream)
* [streamCreatedAt](_googlespeechtotext_.googlespeechtotext.md#streamcreatedat)
* [debug](_googlespeechtotext_.googlespeechtotext.md#debug)

### Methods

* [close](_googlespeechtotext_.googlespeechtotext.md#close)
* [emit](_googlespeechtotext_.googlespeechtotext.md#emit)
* [getStream](_googlespeechtotext_.googlespeechtotext.md#getstream)
* [newStreamRequired](_googlespeechtotext_.googlespeechtotext.md#newstreamrequired)
* [off](_googlespeechtotext_.googlespeechtotext.md#off)
* [on](_googlespeechtotext_.googlespeechtotext.md#on)
* [transcribe](_googlespeechtotext_.googlespeechtotext.md#transcribe)
* [transcriptionComplete](_googlespeechtotext_.googlespeechtotext.md#transcriptioncomplete)
* [createConfig](_googlespeechtotext_.googlespeechtotext.md#createconfig)

## Constructors

### constructor

\+ **new GoogleSpeechToText**(`languageCode`: string, `speechPhrases?`: string[], `useEnhanced?`: boolean, `speechClient?`: SpeechClient): [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md)

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:41](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L41)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`languageCode` | string | - |
`speechPhrases` | string[] | [] |
`useEnhanced` | boolean | false |
`speechClient` | SpeechClient | new SpeechClient() |

**Returns:** [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md)

## Properties

### config

• `Private` `Readonly` **config**: Readonly\<IStreamingRecognitionConfig>

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:37](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L37)*

___

### speechClient

• `Private` `Readonly` **speechClient**: SpeechClient

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:47](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L47)*

___

### stream

• `Private` **stream**: Writable

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:40](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L40)*

___

### streamCreatedAt

• `Private` **streamCreatedAt**: Date

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:41](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L41)*

___

### debug

▪ `Static` `Private` `Readonly` **debug**: Debugger = Debugger.getPackageDebugger()

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:15](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L15)*

## Methods

### close

▸ **close**(): void

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:63](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L63)*

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TranscriptionEvents[K]): boolean

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[emit](_googlespeechtotext_.googlespeechtotext.md#emit)*

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

▸ **getStream**(): Writable

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:84](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L84)*

**Returns:** Writable

___

### newStreamRequired

▸ `Private`**newStreamRequired**(): boolean

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:73](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L73)*

**Returns:** boolean

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): TypedEmitter\<TranscriptionEvents>

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[off](_googlespeechtotext_.googlespeechtotext.md#off)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[on](_googlespeechtotext_.googlespeechtotext.md#on)*

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

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:59](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void

___

### transcriptionComplete

▸ **transcriptionComplete**(): void

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:115](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L115)*

**Returns:** void

___

### createConfig

▸ `Static` `Private`**createConfig**(`languageCode`: string, `speechPhrases`: string[], `useEnhanced`: boolean): Readonly\<IStreamingRecognitionConfig>

*Defined in [transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:17](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`languageCode` | string |
`speechPhrases` | string[] |
`useEnhanced` | boolean |

**Returns:** Readonly\<IStreamingRecognitionConfig>
