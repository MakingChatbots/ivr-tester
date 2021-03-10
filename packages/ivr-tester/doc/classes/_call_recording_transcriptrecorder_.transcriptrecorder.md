**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/recording/TranscriptRecorder"](../modules/_call_recording_transcriptrecorder_.md) / TranscriptRecorder

# Class: TranscriptRecorder

## Hierarchy

* **TranscriptRecorder**

## Index

### Constructors

* [constructor](_call_recording_transcriptrecorder_.transcriptrecorder.md#constructor)

### Properties

* [closeRef](_call_recording_transcriptrecorder_.transcriptrecorder.md#closeref)
* [config](_call_recording_transcriptrecorder_.transcriptrecorder.md#config)
* [processTwilioMessageRef](_call_recording_transcriptrecorder_.transcriptrecorder.md#processtwiliomessageref)
* [saveMatchedPromptRef](_call_recording_transcriptrecorder_.transcriptrecorder.md#savematchedpromptref)
* [testSession](_call_recording_transcriptrecorder_.transcriptrecorder.md#testsession)
* [writeStream](_call_recording_transcriptrecorder_.transcriptrecorder.md#writestream)
* [FILENAME\_SUFFIX](_call_recording_transcriptrecorder_.transcriptrecorder.md#filename_suffix)
* [FILE\_EXT](_call_recording_transcriptrecorder_.transcriptrecorder.md#file_ext)

### Methods

* [close](_call_recording_transcriptrecorder_.transcriptrecorder.md#close)
* [createFile](_call_recording_transcriptrecorder_.transcriptrecorder.md#createfile)
* [createFilename](_call_recording_transcriptrecorder_.transcriptrecorder.md#createfilename)
* [processTwilioMessage](_call_recording_transcriptrecorder_.transcriptrecorder.md#processtwiliomessage)
* [saveMatchedPrompts](_call_recording_transcriptrecorder_.transcriptrecorder.md#savematchedprompts)

## Constructors

### constructor

\+ **new TranscriptRecorder**(`testSession`: [TestSession](../interfaces/_testrunner_.testsession.md), `config`: [RecorderConfig](../interfaces/_call_recording_transcriptrecorder_.recorderconfig.md)): [TranscriptRecorder](_call_recording_transcriptrecorder_.transcriptrecorder.md)

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:72](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L72)*

#### Parameters:

Name | Type |
------ | ------ |
`testSession` | [TestSession](../interfaces/_testrunner_.testsession.md) |
`config` | [RecorderConfig](../interfaces/_call_recording_transcriptrecorder_.recorderconfig.md) |

**Returns:** [TranscriptRecorder](_call_recording_transcriptrecorder_.transcriptrecorder.md)

## Properties

### closeRef

• `Private` `Readonly` **closeRef**: () => void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:70](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L70)*

___

### config

• `Private` `Readonly` **config**: [RecorderConfig](../interfaces/_call_recording_transcriptrecorder_.recorderconfig.md)

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:76](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L76)*

___

### processTwilioMessageRef

• `Private` `Readonly` **processTwilioMessageRef**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:68](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L68)*

___

### saveMatchedPromptRef

• `Private` `Readonly` **saveMatchedPromptRef**: (event: [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md)) => void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:69](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L69)*

___

### testSession

• `Private` `Readonly` **testSession**: [TestSession](../interfaces/_testrunner_.testsession.md)

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:75](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L75)*

___

### writeStream

• `Private` **writeStream**: WriteStream

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:72](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L72)*

___

### FILENAME\_SUFFIX

▪ `Static` `Private` `Readonly` **FILENAME\_SUFFIX**: \"transcript\" = "transcript"

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:66](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L66)*

___

### FILE\_EXT

▪ `Static` `Private` `Readonly` **FILE\_EXT**: \"txt\" = "txt"

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:65](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L65)*

## Methods

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:148](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L148)*

**Returns:** void

___

### createFile

▸ `Private`**createFile**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:138](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L138)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** void

___

### createFilename

▸ `Private`**createFilename**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): string

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:118](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L118)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** string

___

### processTwilioMessage

▸ `Private`**processTwilioMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:98](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L98)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### saveMatchedPrompts

▸ `Private`**saveMatchedPrompts**(`event`: [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md)): void

*Defined in [packages/ivr-tester/src/call/recording/TranscriptRecorder.ts:106](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/recording/TranscriptRecorder.ts#L106)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md) |

**Returns:** void
