**[Google Speech-to-Text Transcriber](../README.md)**

> [Globals](../README.md) / ["GoogleSpeechToText"](../modules/_googlespeechtotext_.md) / GoogleSpeechToText

# Class: GoogleSpeechToText

## Hierarchy

* EventEmitter

  ↳ **GoogleSpeechToText**

## Implements

* TranscriberPlugin

## Index

### Constructors

* [constructor](_googlespeechtotext_.googlespeechtotext.md#constructor)

### Properties

* [config](_googlespeechtotext_.googlespeechtotext.md#config)
* [speechClient](_googlespeechtotext_.googlespeechtotext.md#speechclient)
* [stream](_googlespeechtotext_.googlespeechtotext.md#stream)
* [streamCreatedAt](_googlespeechtotext_.googlespeechtotext.md#streamcreatedat)
* [defaultMaxListeners](_googlespeechtotext_.googlespeechtotext.md#defaultmaxlisteners)
* [errorMonitor](_googlespeechtotext_.googlespeechtotext.md#errormonitor)

### Methods

* [addListener](_googlespeechtotext_.googlespeechtotext.md#addlistener)
* [close](_googlespeechtotext_.googlespeechtotext.md#close)
* [emit](_googlespeechtotext_.googlespeechtotext.md#emit)
* [eventNames](_googlespeechtotext_.googlespeechtotext.md#eventnames)
* [getMaxListeners](_googlespeechtotext_.googlespeechtotext.md#getmaxlisteners)
* [getStream](_googlespeechtotext_.googlespeechtotext.md#getstream)
* [listenerCount](_googlespeechtotext_.googlespeechtotext.md#listenercount)
* [listeners](_googlespeechtotext_.googlespeechtotext.md#listeners)
* [newStreamRequired](_googlespeechtotext_.googlespeechtotext.md#newstreamrequired)
* [off](_googlespeechtotext_.googlespeechtotext.md#off)
* [on](_googlespeechtotext_.googlespeechtotext.md#on)
* [once](_googlespeechtotext_.googlespeechtotext.md#once)
* [prependListener](_googlespeechtotext_.googlespeechtotext.md#prependlistener)
* [prependOnceListener](_googlespeechtotext_.googlespeechtotext.md#prependoncelistener)
* [rawListeners](_googlespeechtotext_.googlespeechtotext.md#rawlisteners)
* [removeAllListeners](_googlespeechtotext_.googlespeechtotext.md#removealllisteners)
* [removeListener](_googlespeechtotext_.googlespeechtotext.md#removelistener)
* [setMaxListeners](_googlespeechtotext_.googlespeechtotext.md#setmaxlisteners)
* [transcribe](_googlespeechtotext_.googlespeechtotext.md#transcribe)
* [createConfig](_googlespeechtotext_.googlespeechtotext.md#createconfig)
* [listenerCount](_googlespeechtotext_.googlespeechtotext.md#listenercount)

## Constructors

### constructor

\+ **new GoogleSpeechToText**(`languageCode`: string, `speechPhrases?`: string[], `useEnhanced?`: boolean, `speechClient?`: SpeechClient): [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md)

*Overrides void*

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:34](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L34)*

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

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:30](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L30)*

___

### speechClient

• `Private` `Readonly` **speechClient**: SpeechClient

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:40](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L40)*

___

### stream

• `Private` **stream**: Writable

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:33](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L33)*

___

### streamCreatedAt

• `Private` **streamCreatedAt**: Date

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:34](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L34)*

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: number

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[defaultMaxListeners](_googlespeechtotext_.googlespeechtotext.md#defaultmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:45*

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: unique symbol

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[errorMonitor](_googlespeechtotext_.googlespeechtotext.md#errormonitor)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[addListener](_googlespeechtotext_.googlespeechtotext.md#addlistener)*

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

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:54](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L54)*

**Returns:** void

___

### emit

▸ **emit**(`event`: string \| symbol, ...`args`: any[]): boolean

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[emit](_googlespeechtotext_.googlespeechtotext.md#emit)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[eventNames](_googlespeechtotext_.googlespeechtotext.md#eventnames)*

*Defined in node_modules/@types/node/events.d.ts:77*

**Returns:** Array\<string \| symbol>

___

### getMaxListeners

▸ **getMaxListeners**(): number

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[getMaxListeners](_googlespeechtotext_.googlespeechtotext.md#getmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:69*

**Returns:** number

___

### getStream

▸ **getStream**(): Writable

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:71](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L71)*

**Returns:** Writable

___

### listenerCount

▸ **listenerCount**(`type`: string \| symbol): number

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[listenerCount](_googlespeechtotext_.googlespeechtotext.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:73*

#### Parameters:

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** number

___

### listeners

▸ **listeners**(`event`: string \| symbol): Function[]

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[listeners](_googlespeechtotext_.googlespeechtotext.md#listeners)*

*Defined in node_modules/@types/node/events.d.ts:70*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### newStreamRequired

▸ `Private`**newStreamRequired**(): boolean

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:60](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L60)*

**Returns:** boolean

___

### off

▸ **off**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[off](_googlespeechtotext_.googlespeechtotext.md#off)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[on](_googlespeechtotext_.googlespeechtotext.md#on)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[once](_googlespeechtotext_.googlespeechtotext.md#once)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[prependListener](_googlespeechtotext_.googlespeechtotext.md#prependlistener)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[prependOnceListener](_googlespeechtotext_.googlespeechtotext.md#prependoncelistener)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[rawListeners](_googlespeechtotext_.googlespeechtotext.md#rawlisteners)*

*Defined in node_modules/@types/node/events.d.ts:71*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: string \| symbol): this

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[removeAllListeners](_googlespeechtotext_.googlespeechtotext.md#removealllisteners)*

*Defined in node_modules/@types/node/events.d.ts:67*

#### Parameters:

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** this

___

### removeListener

▸ **removeListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[removeListener](_googlespeechtotext_.googlespeechtotext.md#removelistener)*

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

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[setMaxListeners](_googlespeechtotext_.googlespeechtotext.md#setmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`n` | number |

**Returns:** this

___

### transcribe

▸ **transcribe**(`payload`: Buffer): void

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:50](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L50)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void

___

### createConfig

▸ `Static` `Private`**createConfig**(`languageCode`: string, `speechPhrases`: string[], `useEnhanced`: boolean): Readonly\<IStreamingRecognitionConfig>

*Defined in [packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts:10](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/transcriber-google-speech-to-text/src/GoogleSpeechToText.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`languageCode` | string |
`speechPhrases` | string[] |
`useEnhanced` | boolean |

**Returns:** Readonly\<IStreamingRecognitionConfig>

___

### listenerCount

▸ `Static`**listenerCount**(`emitter`: EventEmitter, `event`: string \| symbol): number

*Inherited from [GoogleSpeechToText](_googlespeechtotext_.googlespeechtotext.md).[listenerCount](_googlespeechtotext_.googlespeechtotext.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:44*

**`deprecated`** since v4.0.0

#### Parameters:

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string \| symbol |

**Returns:** number
