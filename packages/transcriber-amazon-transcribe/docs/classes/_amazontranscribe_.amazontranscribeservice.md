**[Amazon Transcribe Transcriber](../README.md)**

> [Globals](../README.md) / ["AmazonTranscribe"](../modules/_amazontranscribe_.md) / AmazonTranscribeService

# Class: AmazonTranscribeService

## Hierarchy

* EventEmitter

  ↳ **AmazonTranscribeService**

## Implements

* TranscriberPlugin

## Index

### Constructors

* [constructor](_amazontranscribe_.amazontranscribeservice.md#constructor)

### Properties

* [languageCode](_amazontranscribe_.amazontranscribeservice.md#languagecode)
* [region](_amazontranscribe_.amazontranscribeservice.md#region)
* [transcribeStream](_amazontranscribe_.amazontranscribeservice.md#transcribestream)
* [defaultMaxListeners](_amazontranscribe_.amazontranscribeservice.md#defaultmaxlisteners)
* [errorMonitor](_amazontranscribe_.amazontranscribeservice.md#errormonitor)

### Methods

* [addListener](_amazontranscribe_.amazontranscribeservice.md#addlistener)
* [close](_amazontranscribe_.amazontranscribeservice.md#close)
* [createStream](_amazontranscribe_.amazontranscribeservice.md#createstream)
* [emit](_amazontranscribe_.amazontranscribeservice.md#emit)
* [eventNames](_amazontranscribe_.amazontranscribeservice.md#eventnames)
* [getMaxListeners](_amazontranscribe_.amazontranscribeservice.md#getmaxlisteners)
* [getStream](_amazontranscribe_.amazontranscribeservice.md#getstream)
* [listenerCount](_amazontranscribe_.amazontranscribeservice.md#listenercount)
* [listeners](_amazontranscribe_.amazontranscribeservice.md#listeners)
* [off](_amazontranscribe_.amazontranscribeservice.md#off)
* [on](_amazontranscribe_.amazontranscribeservice.md#on)
* [once](_amazontranscribe_.amazontranscribeservice.md#once)
* [prependListener](_amazontranscribe_.amazontranscribeservice.md#prependlistener)
* [prependOnceListener](_amazontranscribe_.amazontranscribeservice.md#prependoncelistener)
* [rawListeners](_amazontranscribe_.amazontranscribeservice.md#rawlisteners)
* [removeAllListeners](_amazontranscribe_.amazontranscribeservice.md#removealllisteners)
* [removeListener](_amazontranscribe_.amazontranscribeservice.md#removelistener)
* [setMaxListeners](_amazontranscribe_.amazontranscribeservice.md#setmaxlisteners)
* [transcribe](_amazontranscribe_.amazontranscribeservice.md#transcribe)
* [convertAudioEncoding](_amazontranscribe_.amazontranscribeservice.md#convertaudioencoding)
* [listenerCount](_amazontranscribe_.amazontranscribeservice.md#listenercount)

## Constructors

### constructor

\+ **new AmazonTranscribeService**(`region`: AVAILABLE\_REGIONS, `languageCode`: LANGUAGES): [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md)

*Overrides void*

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:10](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`region` | AVAILABLE\_REGIONS |
`languageCode` | LANGUAGES |

**Returns:** [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md)

## Properties

### languageCode

• `Private` `Readonly` **languageCode**: LANGUAGES

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:14](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L14)*

___

### region

• `Private` `Readonly` **region**: AVAILABLE\_REGIONS

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:13](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L13)*

___

### transcribeStream

• `Private` **transcribeStream**: StreamingClient

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:10](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L10)*

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: number

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[defaultMaxListeners](_amazontranscribe_.amazontranscribeservice.md#defaultmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:45*

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: unique symbol

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[errorMonitor](_amazontranscribe_.amazontranscribeservice.md#errormonitor)*

*Defined in node_modules/@types/node/events.d.ts:55*

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

## Methods

### addListener

▸ **addListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[addListener](_amazontranscribe_.amazontranscribeservice.md#addlistener)*

*Defined in node_modules/@types/node/events.d.ts:62*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### close

▸ **close**(): void

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:74](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L74)*

**Returns:** void

___

### createStream

▸ `Private`**createStream**(): StreamingClient

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:37](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L37)*

**Returns:** StreamingClient

___

### emit

▸ **emit**(`event`: string \| symbol, ...`args`: any[]): boolean

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[emit](_amazontranscribe_.amazontranscribeservice.md#emit)*

*Defined in node_modules/@types/node/events.d.ts:72*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`...args` | any[] |

**Returns:** boolean

___

### eventNames

▸ **eventNames**(): Array\<string \| symbol>

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[eventNames](_amazontranscribe_.amazontranscribeservice.md#eventnames)*

*Defined in node_modules/@types/node/events.d.ts:77*

**Returns:** Array\<string \| symbol>

___

### getMaxListeners

▸ **getMaxListeners**(): number

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[getMaxListeners](_amazontranscribe_.amazontranscribeservice.md#getmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:69*

**Returns:** number

___

### getStream

▸ `Private`**getStream**(): StreamingClient

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:28](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L28)*

**Returns:** StreamingClient

___

### listenerCount

▸ **listenerCount**(`type`: string \| symbol): number

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[listenerCount](_amazontranscribe_.amazontranscribeservice.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:73*

#### Parameters:

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** number

___

### listeners

▸ **listeners**(`event`: string \| symbol): Function[]

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[listeners](_amazontranscribe_.amazontranscribeservice.md#listeners)*

*Defined in node_modules/@types/node/events.d.ts:70*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### off

▸ **off**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[off](_amazontranscribe_.amazontranscribeservice.md#off)*

*Defined in node_modules/@types/node/events.d.ts:66*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### on

▸ **on**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[on](_amazontranscribe_.amazontranscribeservice.md#on)*

*Defined in node_modules/@types/node/events.d.ts:63*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### once

▸ **once**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[once](_amazontranscribe_.amazontranscribeservice.md#once)*

*Defined in node_modules/@types/node/events.d.ts:64*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### prependListener

▸ **prependListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[prependListener](_amazontranscribe_.amazontranscribeservice.md#prependlistener)*

*Defined in node_modules/@types/node/events.d.ts:75*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### prependOnceListener

▸ **prependOnceListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[prependOnceListener](_amazontranscribe_.amazontranscribeservice.md#prependoncelistener)*

*Defined in node_modules/@types/node/events.d.ts:76*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### rawListeners

▸ **rawListeners**(`event`: string \| symbol): Function[]

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[rawListeners](_amazontranscribe_.amazontranscribeservice.md#rawlisteners)*

*Defined in node_modules/@types/node/events.d.ts:71*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: string \| symbol): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[removeAllListeners](_amazontranscribe_.amazontranscribeservice.md#removealllisteners)*

*Defined in node_modules/@types/node/events.d.ts:67*

#### Parameters:

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** this

___

### removeListener

▸ **removeListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[removeListener](_amazontranscribe_.amazontranscribeservice.md#removelistener)*

*Defined in node_modules/@types/node/events.d.ts:65*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### setMaxListeners

▸ **setMaxListeners**(`n`: number): this

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[setMaxListeners](_amazontranscribe_.amazontranscribeservice.md#setmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`n` | number |

**Returns:** this

___

### transcribe

▸ **transcribe**(`payload`: Buffer): void

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:79](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L79)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void

___

### convertAudioEncoding

▸ `Static` `Private`**convertAudioEncoding**(`data`: ArrayLike\<unknown>): Buffer

*Defined in [packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts:19](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/transcriber-amazon-transcribe/src/AmazonTranscribe.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | ArrayLike\<unknown> |

**Returns:** Buffer

___

### listenerCount

▸ `Static`**listenerCount**(`emitter`: EventEmitter, `event`: string \| symbol): number

*Inherited from [AmazonTranscribeService](_amazontranscribe_.amazontranscribeservice.md).[listenerCount](_amazontranscribe_.amazontranscribeservice.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:44*

**`deprecated`** since v4.0.0

#### Parameters:

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string \| symbol |

**Returns:** number
