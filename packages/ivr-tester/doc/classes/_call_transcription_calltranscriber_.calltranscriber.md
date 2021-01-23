**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/transcription/CallTranscriber"](../modules/_call_transcription_calltranscriber_.md) / CallTranscriber

# Class: CallTranscriber

## Hierarchy

* [TypedEmitter](_emitter_.typedemitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

  ↳ **CallTranscriber**

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

## Index

### Constructors

* [constructor](_call_transcription_calltranscriber_.calltranscriber.md#constructor)

### Properties

* [call](_call_transcription_calltranscriber_.calltranscriber.md#call)
* [closeRef](_call_transcription_calltranscriber_.calltranscriber.md#closeref)
* [createTimeout](_call_transcription_calltranscriber_.calltranscriber.md#createtimeout)
* [deleteTimeout](_call_transcription_calltranscriber_.calltranscriber.md#deletetimeout)
* [pauseAtEndOfTranscript](_call_transcription_calltranscriber_.calltranscriber.md#pauseatendoftranscript)
* [processMessageRef](_call_transcription_calltranscriber_.calltranscriber.md#processmessageref)
* [timeout](_call_transcription_calltranscriber_.calltranscriber.md#timeout)
* [transcriber](_call_transcription_calltranscriber_.calltranscriber.md#transcriber)
* [transcriptionBuilder](_call_transcription_calltranscriber_.calltranscriber.md#transcriptionbuilder)
* [debug](_call_transcription_calltranscriber_.calltranscriber.md#debug)

### Methods

* [clearTimer](_call_transcription_calltranscriber_.calltranscriber.md#cleartimer)
* [close](_call_transcription_calltranscriber_.calltranscriber.md#close)
* [collectUntilPause](_call_transcription_calltranscriber_.calltranscriber.md#collectuntilpause)
* [emit](_call_transcription_calltranscriber_.calltranscriber.md#emit)
* [emitFinalTranscript](_call_transcription_calltranscriber_.calltranscriber.md#emitfinaltranscript)
* [off](_call_transcription_calltranscriber_.calltranscriber.md#off)
* [on](_call_transcription_calltranscriber_.calltranscriber.md#on)
* [processMessage](_call_transcription_calltranscriber_.calltranscriber.md#processmessage)
* [saveAndEmitPartialTranscript](_call_transcription_calltranscriber_.calltranscriber.md#saveandemitpartialtranscript)

## Constructors

### constructor

\+ **new CallTranscriber**(`call`: [Call](../interfaces/_call_call_.call.md), `transcriber`: [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md), `pauseAtEndOfTranscript`: number, `createTimeout?`: *typeof* setTimeout, `deleteTimeout?`: *typeof* clearTimeout): [CallTranscriber](_call_transcription_calltranscriber_.calltranscriber.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:71](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L71)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`call` | [Call](../interfaces/_call_call_.call.md) | - |
`transcriber` | [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md) | - |
`pauseAtEndOfTranscript` | number | - |
`createTimeout` | *typeof* setTimeout | setTimeout |
`deleteTimeout` | *typeof* clearTimeout | clearTimeout |

**Returns:** [CallTranscriber](_call_transcription_calltranscriber_.calltranscriber.md)

## Properties

### call

• `Private` `Readonly` **call**: [Call](../interfaces/_call_call_.call.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:74](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L74)*

___

### closeRef

• `Private` `Readonly` **closeRef**: () => void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:69](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L69)*

___

### createTimeout

• `Private` `Readonly` **createTimeout**: *typeof* setTimeout

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:78](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L78)*

___

### deleteTimeout

• `Private` `Readonly` **deleteTimeout**: *typeof* clearTimeout

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:79](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L79)*

___

### pauseAtEndOfTranscript

• `Private` `Readonly` **pauseAtEndOfTranscript**: number

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:77](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L77)*

___

### processMessageRef

• `Private` `Readonly` **processMessageRef**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:68](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L68)*

___

### timeout

• `Private` **timeout**: ReturnType\<*typeof* setTimeout>

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:71](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L71)*

___

### transcriber

• `Private` `Readonly` **transcriber**: [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:75](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L75)*

___

### transcriptionBuilder

• `Private` `Readonly` **transcriptionBuilder**: TranscriptionBuilder = new TranscriptionBuilder()

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:70](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L70)*

___

### debug

▪ `Static` `Private` **debug**: Debugger = Debugger.getPackageDebugger()

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:66](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L66)*

## Methods

### clearTimer

▸ `Private`**clearTimer**(): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:132](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L132)*

**Returns:** void

___

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:101](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L101)*

**Returns:** void

___

### collectUntilPause

▸ `Private`**collectUntilPause**(`event`: [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md)): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:139](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L139)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md) |

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: CallTranscriptionEvents[K]): boolean

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[emit](_emitter_.typedemitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | CallTranscriptionEvents[K] |

**Returns:** boolean

___

### emitFinalTranscript

▸ `Private`**emitFinalTranscript**(): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:121](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L121)*

**Returns:** void

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<CallTranscriptionEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[off](_emitter_.typedemitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallTranscriptionEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<CallTranscriptionEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[on](_emitter_.typedemitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallTranscriptionEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallTranscriptionEvents](../modules/_call_transcription_calltranscriber_.md#calltranscriptionevents)>

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:92](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### saveAndEmitPartialTranscript

▸ `Private`**saveAndEmitPartialTranscript**(): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:110](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L110)*

**Returns:** void
