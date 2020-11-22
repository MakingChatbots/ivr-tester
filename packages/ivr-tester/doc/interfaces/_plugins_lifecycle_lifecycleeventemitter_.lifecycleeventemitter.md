**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/lifecycle/LifecycleEventEmitter"](../modules/_plugins_lifecycle_lifecycleeventemitter_.md) / LifecycleEventEmitter

# Interface: LifecycleEventEmitter\<T, T>

## Type parameters

Name | Type |
------ | ------ |
`T` | EventMap |
`T` | EventMap |

## Hierarchy

* [Emitter](_plugins_emitter_.emitter.md)

* [Emitter](_plugins_emitter_.emitter.md)

  ↳ **LifecycleEventEmitter**

## Index

### Methods

* [emit](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md#emit)
* [off](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md#off)
* [on](_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md#on)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: T[K]): void

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[emit](_plugins_emitter_.emitter.md#emit)*

*Overrides [Emitter](_plugins_emitter_.emitter.md).[emit](_plugins_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f7aae90/packages/ivr-tester/src/plugins/Emitter.ts#L11)*

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

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[off](_plugins_emitter_.emitter.md#off)*

*Overrides [Emitter](_plugins_emitter_.emitter.md).[off](_plugins_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:10](https://github.com/SketchingDev/ivr-tester/blob/f7aae90/packages/ivr-tester/src/plugins/Emitter.ts#L10)*

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

*Inherited from [Emitter](_plugins_emitter_.emitter.md).[on](_plugins_emitter_.emitter.md#on)*

*Overrides [Emitter](_plugins_emitter_.emitter.md).[on](_plugins_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/plugins/Emitter.ts:9](https://github.com/SketchingDev/ivr-tester/blob/f7aae90/packages/ivr-tester/src/plugins/Emitter.ts#L9)*

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
