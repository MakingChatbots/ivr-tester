**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/transcription/CallTranscriber"](../modules/_call_transcription_calltranscriber_.md) / CallTranscriber

# Class: CallTranscriber

## Hierarchy

* [TypedEmitter](_emitter_.typedemitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

  ↳ **CallTranscriber**

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

## Index

### Constructors

* [constructor](_call_transcription_calltranscriber_.calltranscriber.md#constructor)

### Properties

* [call](_call_transcription_calltranscriber_.calltranscriber.md#call)
* [closeRef](_call_transcription_calltranscriber_.calltranscriber.md#closeref)
* [processMessageRef](_call_transcription_calltranscriber_.calltranscriber.md#processmessageref)
* [transcriber](_call_transcription_calltranscriber_.calltranscriber.md#transcriber)
* [debug](_call_transcription_calltranscriber_.calltranscriber.md#debug)

### Methods

* [close](_call_transcription_calltranscriber_.calltranscriber.md#close)
* [collects](_call_transcription_calltranscriber_.calltranscriber.md#collects)
* [emit](_call_transcription_calltranscriber_.calltranscriber.md#emit)
* [off](_call_transcription_calltranscriber_.calltranscriber.md#off)
* [on](_call_transcription_calltranscriber_.calltranscriber.md#on)
* [processMessage](_call_transcription_calltranscriber_.calltranscriber.md#processmessage)

## Constructors

### constructor

\+ **new CallTranscriber**(`call`: [Call](../interfaces/_call_call_.call.md), `transcriber`: [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)): [CallTranscriber](_call_transcription_calltranscriber_.calltranscriber.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:16](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | [Call](../interfaces/_call_call_.call.md) |
`transcriber` | [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md) |

**Returns:** [CallTranscriber](_call_transcription_calltranscriber_.calltranscriber.md)

## Properties

### call

• `Private` `Readonly` **call**: [Call](../interfaces/_call_call_.call.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:19](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L19)*

___

### closeRef

• `Private` `Readonly` **closeRef**: () => void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:16](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L16)*

___

### processMessageRef

• `Private` `Readonly` **processMessageRef**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:15](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L15)*

___

### transcriber

• `Private` `Readonly` **transcriber**: [TranscriberPlugin](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:20](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L20)*

___

### debug

▪ `Static` `Private` **debug**: Debugger = Debugger.getPackageDebugger()

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:13](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L13)*

## Methods

### close

▸ `Private`**close**(): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:42](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L42)*

**Returns:** void

___

### collects

▸ `Private`**collects**(`event`: [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md)): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:51](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md) |

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TranscriptionEvents[K]): boolean

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[emit](_emitter_.typedemitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | TranscriptionEvents[K] |

**Returns:** boolean

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[off](_emitter_.typedemitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[on](_emitter_.typedemitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/transcription/CallTranscriber.ts:33](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/CallTranscriber.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void
