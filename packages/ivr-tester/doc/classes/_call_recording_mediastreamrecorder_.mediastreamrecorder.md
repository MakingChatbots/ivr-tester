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
* [testSession](_call_recording_mediastreamrecorder_.mediastreamrecorder.md#testsession)
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

\+ **new MediaStreamRecorder**(`testSession`: [TestSession](../interfaces/_testrunner_.testsession.md), `config`: [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md)): [MediaStreamRecorder](_call_recording_mediastreamrecorder_.mediastreamrecorder.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:65](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`testSession` | [TestSession](../interfaces/_testrunner_.testsession.md) |
`config` | [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md) |

**Returns:** [MediaStreamRecorder](_call_recording_mediastreamrecorder_.mediastreamrecorder.md)

## Properties

### closeRef

• `Private` `Readonly` **closeRef**: () => void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:65](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L65)*

___

### config

• `Private` `Readonly` **config**: [RecorderConfig](../interfaces/_call_recording_mediastreamrecorder_.recorderconfig.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:69](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L69)*

___

### processMessageRef

• `Private` `Readonly` **processMessageRef**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:64](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L64)*

___

### testSession

• `Private` `Readonly` **testSession**: [TestSession](../interfaces/_testrunner_.testsession.md)

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:68](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L68)*

___

### writeStream

• `Private` **writeStream**: WriteStream

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:63](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L63)*

___

### FILE\_EXT

▪ `Static` `Private` `Readonly` **FILE\_EXT**: \"raw\" = "raw"

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:61](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L61)*

## Methods

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:124](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L124)*

**Returns:** void

___

### createFile

▸ `Private`**createFile**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:111](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L111)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** void

___

### createFilename

▸ `Private`**createFilename**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): string

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:92](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** string

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:80](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### writeToFile

▸ `Private`**writeToFile**(`data`: Buffer): void

*Defined in [packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts:120](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/MediaStreamRecorder.ts#L120)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** void
