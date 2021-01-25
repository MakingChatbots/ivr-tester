**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/transcription/plugin/TranscriberPlugin"](../modules/_call_transcription_plugin_transcriberplugin_.md) / TranscriberPlugin

# Interface: TranscriberPlugin

## Hierarchy

* [Emitter](_emitter_.emitter.md)\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)>

  ↳ **TranscriberPlugin**

## Index

### Methods

* [close](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#close)
* [emit](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#emit)
* [off](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#off)
* [on](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#on)
* [transcribe](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#transcribe)
* [transcriptionComplete](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md#transcriptioncomplete)

## Methods

### close

▸ **close**(): void

*Defined in [packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts:16](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L16)*

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TranscriptionEvents[K]): void

*Inherited from [Emitter](_emitter_.emitter.md).[emit](_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L13)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | TranscriptionEvents[K] |

**Returns:** void

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[off](_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L12)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[on](_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_call_transcription_plugin_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** void

___

### transcribe

▸ **transcribe**(`payload`: Buffer): void

*Defined in [packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts:17](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void

___

### transcriptionComplete

▸ **transcriptionComplete**(): void

*Defined in [packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts:18](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L18)*

**Returns:** void
