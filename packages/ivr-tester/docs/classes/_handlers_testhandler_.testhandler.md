**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["handlers/TestHandler"](../modules/_handlers_testhandler_.md) / TestHandler

# Class: TestHandler

Conditions have to have been met in sequence

## Hierarchy

* EventEmitter

  ↳ **TestHandler**

## Index

### Constructors

* [constructor](_handlers_testhandler_.testhandler.md#constructor)

### Properties

* [call](_handlers_testhandler_.testhandler.md#call)
* [ivrTest](_handlers_testhandler_.testhandler.md#ivrtest)
* [transcriptionHandler](_handlers_testhandler_.testhandler.md#transcriptionhandler)
* [TEST\_CONDITION\_MET\_EVENT](_handlers_testhandler_.testhandler.md#test_condition_met_event)
* [TEST\_FAILED\_EVENT](_handlers_testhandler_.testhandler.md#test_failed_event)
* [TEST\_PASSED\_EVENT](_handlers_testhandler_.testhandler.md#test_passed_event)
* [TRANSCRIPTION\_EVENT](_handlers_testhandler_.testhandler.md#transcription_event)
* [defaultMaxListeners](_handlers_testhandler_.testhandler.md#defaultmaxlisteners)
* [errorMonitor](_handlers_testhandler_.testhandler.md#errormonitor)

### Methods

* [addListener](_handlers_testhandler_.testhandler.md#addlistener)
* [emit](_handlers_testhandler_.testhandler.md#emit)
* [eventNames](_handlers_testhandler_.testhandler.md#eventnames)
* [getMaxListeners](_handlers_testhandler_.testhandler.md#getmaxlisteners)
* [listenerCount](_handlers_testhandler_.testhandler.md#listenercount)
* [listeners](_handlers_testhandler_.testhandler.md#listeners)
* [notifyOfConditionBeingMet](_handlers_testhandler_.testhandler.md#notifyofconditionbeingmet)
* [notifyOfFailedTest](_handlers_testhandler_.testhandler.md#notifyoffailedtest)
* [notifyOfPassedTest](_handlers_testhandler_.testhandler.md#notifyofpassedtest)
* [off](_handlers_testhandler_.testhandler.md#off)
* [on](_handlers_testhandler_.testhandler.md#on)
* [once](_handlers_testhandler_.testhandler.md#once)
* [prependListener](_handlers_testhandler_.testhandler.md#prependlistener)
* [prependOnceListener](_handlers_testhandler_.testhandler.md#prependoncelistener)
* [processTranscript](_handlers_testhandler_.testhandler.md#processtranscript)
* [rawListeners](_handlers_testhandler_.testhandler.md#rawlisteners)
* [removeAllListeners](_handlers_testhandler_.testhandler.md#removealllisteners)
* [removeListener](_handlers_testhandler_.testhandler.md#removelistener)
* [setMaxListeners](_handlers_testhandler_.testhandler.md#setmaxlisteners)
* [listenerCount](_handlers_testhandler_.testhandler.md#listenercount)

## Constructors

### constructor

\+ **new TestHandler**(`call`: [Call](../interfaces/_handlers_inorder_.call.md), `transcriptionHandler`: EventEmitter, `ivrTest`: [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)): [TestHandler](_handlers_testhandler_.testhandler.md)

*Overrides void*

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:49](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | [Call](../interfaces/_handlers_inorder_.call.md) |
`transcriptionHandler` | EventEmitter |
`ivrTest` | [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md) |

**Returns:** [TestHandler](_handlers_testhandler_.testhandler.md)

## Properties

### call

• `Private` `Readonly` **call**: [Call](../interfaces/_handlers_inorder_.call.md)

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:52](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L52)*

___

### ivrTest

• `Private` `Readonly` **ivrTest**: [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:54](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L54)*

___

### transcriptionHandler

• `Private` `Readonly` **transcriptionHandler**: EventEmitter

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:53](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L53)*

___

### TEST\_CONDITION\_MET\_EVENT

▪ `Static` `Private` `Readonly` **TEST\_CONDITION\_MET\_EVENT**: \"ConditionMet\" = "ConditionMet"

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:49](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L49)*

___

### TEST\_FAILED\_EVENT

▪ `Static` `Private` `Readonly` **TEST\_FAILED\_EVENT**: \"TestFailed\" = "TestFailed"

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:47](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L47)*

___

### TEST\_PASSED\_EVENT

▪ `Static` `Private` `Readonly` **TEST\_PASSED\_EVENT**: \"TestPassed\" = "TestPassed"

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:48](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L48)*

___

### TRANSCRIPTION\_EVENT

▪ `Static` `Private` `Readonly` **TRANSCRIPTION\_EVENT**: \"transcription\" = "transcription"

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:45](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L45)*

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: number

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[defaultMaxListeners](_handlers_testhandler_.testhandler.md#defaultmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:45*

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: unique symbol

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[errorMonitor](_handlers_testhandler_.testhandler.md#errormonitor)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[addListener](_handlers_testhandler_.testhandler.md#addlistener)*

*Defined in node_modules/@types/node/events.d.ts:62*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### emit

▸ **emit**(`event`: string \| symbol, ...`args`: any[]): boolean

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[emit](_handlers_testhandler_.testhandler.md#emit)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[eventNames](_handlers_testhandler_.testhandler.md#eventnames)*

*Defined in node_modules/@types/node/events.d.ts:77*

**Returns:** Array\<string \| symbol>

___

### getMaxListeners

▸ **getMaxListeners**(): number

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[getMaxListeners](_handlers_testhandler_.testhandler.md#getmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:69*

**Returns:** number

___

### listenerCount

▸ **listenerCount**(`type`: string \| symbol): number

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[listenerCount](_handlers_testhandler_.testhandler.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:73*

#### Parameters:

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** number

___

### listeners

▸ **listeners**(`event`: string \| symbol): Function[]

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[listeners](_handlers_testhandler_.testhandler.md#listeners)*

*Defined in node_modules/@types/node/events.d.ts:70*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### notifyOfConditionBeingMet

▸ `Private`**notifyOfConditionBeingMet**(`transcription`: string, `condition`: [TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md)): void

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:103](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L103)*

#### Parameters:

Name | Type |
------ | ------ |
`transcription` | string |
`condition` | [TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md) |

**Returns:** void

___

### notifyOfFailedTest

▸ `Private`**notifyOfFailedTest**(`transcription`: string): void

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:91](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`transcription` | string |

**Returns:** void

___

### notifyOfPassedTest

▸ `Private`**notifyOfPassedTest**(): void

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:96](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L96)*

**Returns:** void

___

### off

▸ **off**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[off](_handlers_testhandler_.testhandler.md#off)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[on](_handlers_testhandler_.testhandler.md#on)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[once](_handlers_testhandler_.testhandler.md#once)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[prependListener](_handlers_testhandler_.testhandler.md#prependlistener)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[prependOnceListener](_handlers_testhandler_.testhandler.md#prependoncelistener)*

*Defined in node_modules/@types/node/events.d.ts:76*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |
`listener` | (...args: any[]) => void |

**Returns:** this

___

### processTranscript

▸ `Private`**processTranscript**(`__namedParameters`: { transcription: string  }): void

*Defined in [packages/ivr-tester/src/handlers/TestHandler.ts:63](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/handlers/TestHandler.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { transcription: string  } |

**Returns:** void

___

### rawListeners

▸ **rawListeners**(`event`: string \| symbol): Function[]

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[rawListeners](_handlers_testhandler_.testhandler.md#rawlisteners)*

*Defined in node_modules/@types/node/events.d.ts:71*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** Function[]

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: string \| symbol): this

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[removeAllListeners](_handlers_testhandler_.testhandler.md#removealllisteners)*

*Defined in node_modules/@types/node/events.d.ts:67*

#### Parameters:

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** this

___

### removeListener

▸ **removeListener**(`event`: string \| symbol, `listener`: (...args: any[]) => void): this

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[removeListener](_handlers_testhandler_.testhandler.md#removelistener)*

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

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[setMaxListeners](_handlers_testhandler_.testhandler.md#setmaxlisteners)*

*Defined in node_modules/@types/node/events.d.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`n` | number |

**Returns:** this

___

### listenerCount

▸ `Static`**listenerCount**(`emitter`: EventEmitter, `event`: string \| symbol): number

*Inherited from [TestHandler](_handlers_testhandler_.testhandler.md).[listenerCount](_handlers_testhandler_.testhandler.md#listenercount)*

*Defined in node_modules/@types/node/events.d.ts:44*

**`deprecated`** since v4.0.0

#### Parameters:

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string \| symbol |

**Returns:** number
