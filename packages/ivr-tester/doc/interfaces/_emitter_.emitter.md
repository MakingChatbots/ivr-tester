**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["Emitter"](../modules/_emitter_.md) / Emitter

# Interface: Emitter\<T>

## Type parameters

Name | Type |
------ | ------ |
`T` | EventMap |

## Hierarchy

* **Emitter**

  ↳ [Call](_call_call_.call.md)

  ↳ [TranscriberPlugin](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)

  ↳ [TestInstance](_testing_test_testinstanceclass_.testinstance.md)

  ↳ [CallServer](_testing_twiliocallserver_.callserver.md)

## Implemented by

* [CallTranscriber](../classes/_call_transcription_calltranscriber_.calltranscriber.md)
* [PluginManager](../classes/_plugins_pluginmanager_.pluginmanager.md)
* [TwilioCall](../classes/_call_twiliocall_.twiliocall.md)
* [TwilioCallServer](../classes/_testing_twiliocallserver_.twiliocallserver.md)
* [TypedEmitter](../classes/_emitter_.typedemitter.md)

## Index

### Methods

* [emit](_emitter_.emitter.md#emit)
* [off](_emitter_.emitter.md#off)
* [on](_emitter_.emitter.md#on)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: T[K]): void

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L13)*

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

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L12)*

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

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/Emitter.ts#L11)*

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
