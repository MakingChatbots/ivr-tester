**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/transcription/PromptTranscriptionBuilder"](../modules/_call_transcription_prompttranscriptionbuilder_.md) / PromptTranscriptionBuilder

# Class: PromptTranscriptionBuilder

## Hierarchy

* **PromptTranscriptionBuilder**

## Index

### Properties

* [transcriptions](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md#transcriptions)
* [EMPTY\_TRANSCRIPTION](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md#empty_transcription)

### Methods

* [add](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md#add)
* [clear](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md#clear)
* [merge](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md#merge)

## Properties

### transcriptions

• `Private` **transcriptions**: [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md)[] = []

*Defined in [packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts:6](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts#L6)*

___

### EMPTY\_TRANSCRIPTION

▪ `Static` `Private` `Readonly` **EMPTY\_TRANSCRIPTION**: "" = ""

*Defined in [packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts:4](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts#L4)*

## Methods

### add

▸ **add**(`event`: [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md)): void

*Defined in [packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts:8](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TranscriptEvent](../interfaces/_call_transcription_plugin_transcriberplugin_.transcriptevent.md) |

**Returns:** void

___

### clear

▸ **clear**(): void

*Defined in [packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts:12](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts#L12)*

**Returns:** void

___

### merge

▸ **merge**(): string

*Defined in [packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts:16](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/transcription/PromptTranscriptionBuilder.ts#L16)*

**Returns:** string
