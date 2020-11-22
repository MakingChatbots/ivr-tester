**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/Emitter"](../modules/_plugins_emitter_.md) / Emitter

# Interface: Emitter\<T>

## Type parameters

Name | Type |
------ | ------ |
`T` | EventMap |

## Hierarchy

* **Emitter**

  ↳ [TranscriberPlugin](_plugins_transcription_transcriberplugin_.transcriberplugin.md)

  ↳ [LifecycleEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

  ↳ [LifecycleEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

## Index

### Methods

* [emit](_plugins_emitter_.emitter.md#emit)
* [off](_plugins_emitter_.emitter.md#off)
* [on](_plugins_emitter_.emitter.md#on)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: T[K]): void

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/plugins/Emitter.ts#L11)*

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

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:10](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/plugins/Emitter.ts#L10)*

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

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:9](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/plugins/Emitter.ts#L9)*

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
