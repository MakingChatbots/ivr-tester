[IVR Tester](../README.md) / Emitter

# Interface: Emitter<T\>

## Type parameters

Name | Type |
:------ | :------ |
`T` | EventMap |

## Hierarchy

* **Emitter**

  ↳ [*TranscriberPlugin*](transcriberplugin.md)

## Implemented by

* [*TypedEmitter*](../classes/typedemitter.md)

## Table of contents

### Methods

- [emit](emitter.md#emit)
- [off](emitter.md#off)
- [on](emitter.md#on)

## Methods

### emit

▸ **emit**<K\>(`eventName`: K, `params`: T[K]): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`params` | T[K] |

**Returns:** *void*

Defined in: [Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L13)

___

### off

▸ **off**<K\>(`eventName`: K, `fn`: *EventReceiver*<T[K]\>): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<T[K]\> |

**Returns:** *void*

Defined in: [Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L12)

___

### on

▸ **on**<K\>(`eventName`: K, `fn`: *EventReceiver*<T[K]\>): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<T[K]\> |

**Returns:** *void*

Defined in: [Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L11)
