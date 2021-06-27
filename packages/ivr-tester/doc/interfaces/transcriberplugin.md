[IVR Tester](../README.md) / TranscriberPlugin

# Interface: TranscriberPlugin

## Hierarchy

* [*Emitter*](emitter.md)<[*TranscriptionEvents*](../README.md#transcriptionevents)\>

  ↳ **TranscriberPlugin**

## Table of contents

### Methods

- [close](transcriberplugin.md#close)
- [emit](transcriberplugin.md#emit)
- [off](transcriberplugin.md#off)
- [on](transcriberplugin.md#on)
- [transcribe](transcriberplugin.md#transcribe)
- [transcriptionComplete](transcriberplugin.md#transcriptioncomplete)

## Methods

### close

▸ **close**(): *void*

**Returns:** *void*

Defined in: [call/transcription/plugin/TranscriberPlugin.ts:16](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L16)

___

### emit

▸ **emit**<K\>(`eventName`: K, `params`: [*TranscriptionEvents*](../README.md#transcriptionevents)[K]): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *transcription* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`params` | [*TranscriptionEvents*](../README.md#transcriptionevents)[K] |

**Returns:** *void*

Inherited from: [Emitter](emitter.md)

Defined in: [Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L13)

___

### off

▸ **off**<K\>(`eventName`: K, `fn`: *EventReceiver*<[*TranscriptionEvents*](../README.md#transcriptionevents)[K]\>): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *transcription* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<[*TranscriptionEvents*](../README.md#transcriptionevents)[K]\> |

**Returns:** *void*

Inherited from: [Emitter](emitter.md)

Defined in: [Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L12)

___

### on

▸ **on**<K\>(`eventName`: K, `fn`: *EventReceiver*<[*TranscriptionEvents*](../README.md#transcriptionevents)[K]\>): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *transcription* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<[*TranscriptionEvents*](../README.md#transcriptionevents)[K]\> |

**Returns:** *void*

Inherited from: [Emitter](emitter.md)

Defined in: [Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L11)

___

### transcribe

▸ **transcribe**(`payload`: *Buffer*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`payload` | *Buffer* |

**Returns:** *void*

Defined in: [call/transcription/plugin/TranscriberPlugin.ts:17](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L17)

___

### transcriptionComplete

▸ **transcriptionComplete**(): *void*

**Returns:** *void*

Defined in: [call/transcription/plugin/TranscriberPlugin.ts:18](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L18)
