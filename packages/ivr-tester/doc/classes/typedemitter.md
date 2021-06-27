[IVR Tester](../README.md) / TypedEmitter

# Class: TypedEmitter<T\>

## Type parameters

Name | Type |
:------ | :------ |
`T` | EventMap |

## Hierarchy

* **TypedEmitter**

  ↳ [*PluginManager*](pluginmanager.md)

## Implements

* [*Emitter*](../interfaces/emitter.md)<T\>

## Table of contents

### Constructors

- [constructor](typedemitter.md#constructor)

### Properties

- [emitter](typedemitter.md#emitter)

### Methods

- [emit](typedemitter.md#emit)
- [off](typedemitter.md#off)
- [on](typedemitter.md#on)

## Constructors

### constructor

\+ **new TypedEmitter**<T\>(): [*TypedEmitter*](typedemitter.md)<T\>

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | EventMap |

**Returns:** [*TypedEmitter*](typedemitter.md)<T\>

## Properties

### emitter

• `Private` `Readonly` **emitter**: *EventEmitter*

Defined in: [Emitter.ts:17](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L17)

## Methods

### emit

▸ **emit**<K\>(`eventName`: K, `params`: T[K]): *boolean*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`params` | T[K] |

**Returns:** *boolean*

Defined in: [Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L35)

___

### off

▸ **off**<K\>(`eventName`: K, `fn`: *EventReceiver*<T[K]\>): [*TypedEmitter*](typedemitter.md)<T\>

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<T[K]\> |

**Returns:** [*TypedEmitter*](typedemitter.md)<T\>

Defined in: [Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L27)

___

### on

▸ **on**<K\>(`eventName`: K, `fn`: *EventReceiver*<T[K]\>): [*TypedEmitter*](typedemitter.md)<T\>

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<T[K]\> |

**Returns:** [*TypedEmitter*](typedemitter.md)<T\>

Defined in: [Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L19)
