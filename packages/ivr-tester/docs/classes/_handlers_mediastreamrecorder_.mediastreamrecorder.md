**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["handlers/MediaStreamRecorder"](../modules/_handlers_mediastreamrecorder_.md) / MediaStreamRecorder

# Class: MediaStreamRecorder

## Hierarchy

* **MediaStreamRecorder**

## Index

### Constructors

* [constructor](_handlers_mediastreamrecorder_.mediastreamrecorder.md#constructor)

### Properties

* [config](_handlers_mediastreamrecorder_.mediastreamrecorder.md#config)
* [connection](_handlers_mediastreamrecorder_.mediastreamrecorder.md#connection)
* [onCloseFunc](_handlers_mediastreamrecorder_.mediastreamrecorder.md#onclosefunc)
* [onMessageFunc](_handlers_mediastreamrecorder_.mediastreamrecorder.md#onmessagefunc)
* [test](_handlers_mediastreamrecorder_.mediastreamrecorder.md#test)
* [writeStream](_handlers_mediastreamrecorder_.mediastreamrecorder.md#writestream)
* [FILE\_EXT](_handlers_mediastreamrecorder_.mediastreamrecorder.md#file_ext)

### Methods

* [close](_handlers_mediastreamrecorder_.mediastreamrecorder.md#close)
* [createFile](_handlers_mediastreamrecorder_.mediastreamrecorder.md#createfile)
* [createFilename](_handlers_mediastreamrecorder_.mediastreamrecorder.md#createfilename)
* [processMessage](_handlers_mediastreamrecorder_.mediastreamrecorder.md#processmessage)
* [writeToFile](_handlers_mediastreamrecorder_.mediastreamrecorder.md#writetofile)

## Constructors

### constructor

\+ **new MediaStreamRecorder**(`connection`: ws, `config`: [RecorderConfig](../interfaces/_handlers_mediastreamrecorder_.recorderconfig.md), `test`: [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)): [MediaStreamRecorder](_handlers_mediastreamrecorder_.mediastreamrecorder.md)

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:27](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`connection` | ws |
`config` | [RecorderConfig](../interfaces/_handlers_mediastreamrecorder_.recorderconfig.md) |
`test` | [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md) |

**Returns:** [MediaStreamRecorder](_handlers_mediastreamrecorder_.mediastreamrecorder.md)

## Properties

### config

• `Private` `Readonly` **config**: [RecorderConfig](../interfaces/_handlers_mediastreamrecorder_.recorderconfig.md)

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:31](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L31)*

___

### connection

• `Private` `Readonly` **connection**: ws

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:30](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L30)*

___

### onCloseFunc

• `Private` `Readonly` **onCloseFunc**: (event: any) => void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:27](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L27)*

___

### onMessageFunc

• `Private` `Readonly` **onMessageFunc**: (event: any) => void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:26](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L26)*

___

### test

• `Private` `Readonly` **test**: [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:32](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L32)*

___

### writeStream

• `Private` **writeStream**: WriteStream

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:25](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L25)*

___

### FILE\_EXT

▪ `Static` `Private` `Readonly` **FILE\_EXT**: \"wav\" = "wav"

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:23](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L23)*

## Methods

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:90](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L90)*

**Returns:** void

___

### createFile

▸ `Private`**createFile**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md)): void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:77](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L77)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md) |

**Returns:** void

___

### createFilename

▸ `Private`**createFilename**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md)): string

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:56](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L56)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md) |

**Returns:** string

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:40](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### writeToFile

▸ `Private`**writeToFile**(`data`: Buffer): void

*Defined in [packages/ivr-tester/src/handlers/MediaStreamRecorder.ts:86](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/handlers/MediaStreamRecorder.ts#L86)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** void
