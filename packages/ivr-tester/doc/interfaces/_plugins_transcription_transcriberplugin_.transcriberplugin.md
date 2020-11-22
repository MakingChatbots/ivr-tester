**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/transcription/TranscriberPlugin"](../modules/_plugins_transcription_transcriberplugin_.md) / TranscriberPlugin

# Interface: TranscriberPlugin

## Hierarchy

* [Emitter](_plugins_emitter_.emitter.md)\<[TranscriptionEvents](../modules/_plugins_transcription_transcriberplugin_.md#transcriptionevents)>

  ↳ **TranscriberPlugin**

## Index

### Methods

* [close](_plugins_transcription_transcriberplugin_.transcriberplugin.md#close)
* [emit](_plugins_transcription_transcriberplugin_.transcriberplugin.md#emit)
* [off](_plugins_transcription_transcriberplugin_.transcriberplugin.md#off)
* [on](_plugins_transcription_transcriberplugin_.transcriberplugin.md#on)
* [transcribe](_plugins_transcription_transcriberplugin_.transcriberplugin.md#transcribe)

## Methods

### close

▸ **close**(): void

*Defined in [packages/ivr-tester/src/plugins/transcription/TranscriberPlugin.ts:13](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/transcription/TranscriberPlugin.ts#L13)*

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TranscriptionEvents[K]): void

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[emit](_plugins_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_plugins_transcription_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | TranscriptionEvents[K] |

**Returns:** void

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): void

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[off](_plugins_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:10](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/Emitter.ts#L10)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_plugins_transcription_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<TranscriptionEvents[K]>): void

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[on](_plugins_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:9](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/Emitter.ts#L9)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TranscriptionEvents](../modules/_plugins_transcription_transcriberplugin_.md#transcriptionevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TranscriptionEvents[K]> |

**Returns:** void

___

### transcribe

▸ **transcribe**(`payload`: Buffer): void

*Defined in [packages/ivr-tester/src/plugins/transcription/TranscriberPlugin.ts:14](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/transcription/TranscriberPlugin.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void
