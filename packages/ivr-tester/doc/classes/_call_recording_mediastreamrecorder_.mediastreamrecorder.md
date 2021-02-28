**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/recording/MediaStreamRecorder"](../modules/_call_recording_mediastreamrecorder_.md) / MediaStreamRecorder

# Class: MediaStreamRecorder

## Hierarchy

* **MediaStreamRecorder**

## Index

### Constructors

* [constructor](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#constructor)

### Properties

* [closeRef](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#closeref)
* [config](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#config)
* [processMessageRef](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#processmessageref)
* [testInstance](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#testinstance)
* [writeStream](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#writestream)
* [FILE\_EXT](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#file_ext)

### Methods

* [close](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#close)
* [createFile](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#createfile)
* [createFilename](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#createfilename)
* [processMessage](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#processmessage)
* [writeToFile](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#writetofile)

## Constructors

### constructor

\+ **new MediaStreamRecorder**(`testInstance`: [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md), `config`: [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md)): [MediaStreamRecorder](_call_recording_mediastreamrecorder_.mediastreamrecorder.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:71](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`testInstance` | [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md) |
`config` | [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md) |

**Returns:** [MediaStreamRecorder](_call_recording_mediastreamrecorder_.mediastreamrecorder.md)

## Properties

### closeRef

• `Private` `Readonly` **closeRef**: () => void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:71](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L71)*

___

### config

• `Private` `Readonly` **config**: [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:75](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L75)*

___

### processMessageRef

• `Private` `Readonly` **processMessageRef**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:70](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L70)*

___

### testInstance

• `Private` `Readonly` **testInstance**: [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:74](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L74)*

___

### writeStream

• `Private` **writeStream**: WriteStream

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:69](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L69)*

___

### FILE\_EXT

▪ `Static` `Private` `Readonly` **FILE\_EXT**: \"wav\" = "wav"

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:67](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L67)*

## Methods

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:130](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L130)*

**Returns:** void

___

### createFile

▸ `Private`**createFile**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:117](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L117)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** void

___

### createFilename

▸ `Private`**createFilename**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): string

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:98](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L98)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** string

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:86](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L86)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### writeToFile

▸ `Private`**writeToFile**(`data`: Buffer): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:126](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L126)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** void
