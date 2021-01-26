**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["Emitter"](../modules/_emitter_.md) / TypedEmitter

# Class: TypedEmitter\<T>

## Type parameters

Name | Type |
------ | ------ |
`T` | EventMap |

## Hierarchy

* **TypedEmitter**

  ↳ [TwilioCall](_call_twiliocall_.twiliocall.md)

  ↳ [CallTranscriber](_call_transcription_calltranscriber_.calltranscriber.md)

  ↳ [TwilioCallServer](_testing_twiliocallserver_.twiliocallserver.md)

  ↳ [PluginManager](_plugins_pluginmanager_.pluginmanager.md)

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<T>

## Index

### Properties

* [emitter](_emitter_.typedemitter.md#emitter)

### Methods

* [emit](_emitter_.typedemitter.md#emit)
* [off](_emitter_.typedemitter.md#off)
* [on](_emitter_.typedemitter.md#on)

## Properties

### emitter

• `Private` `Readonly` **emitter**: EventEmitter = new EventEmitter()

*Defined in [packages/ivr-tester/src/Emitter.ts:17](https://github.com/SketchingDev/ivr-tester/blob/d4b858b/packages/ivr-tester/src/Emitter.ts#L17)*

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: T[K]): boolean

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/d4b858b/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | T[K] |

**Returns:** boolean

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<T[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<T>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/d4b858b/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<T[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<T>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<T[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<T>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/d4b858b/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<T> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<T[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<T>
