**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["Emitter"](../modules/_emitter_.md) / Emitter

# Interface: Emitter\<T>

## Type parameters

Name | Type |
------ | ------ |
`T` | EventMap |

## Hierarchy

* **Emitter**

  ↳ [TranscriberPlugin](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)

  ↳ [LifecycleEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

  ↳ [LifecycleEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

## Implemented by

* [CallTranscriber](../classes/_call_transcription_calltranscriber_.calltranscriber.md)
* [TypedEmitter](../classes/_emitter_.typedemitter.md)

## Index

### Methods

* [emit](_emitter_.emitter.md#emit)
* [off](_emitter_.emitter.md#off)
* [on](_emitter_.emitter.md#on)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: T[K]): void

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/Emitter.ts#L13)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | T[K] |

**Returns:** void

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<T[K]>): void

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/Emitter.ts#L12)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<T[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<T[K]>): void

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<T[K]> |

**Returns:** void
