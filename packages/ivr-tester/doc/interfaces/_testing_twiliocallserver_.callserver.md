**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/TwilioCallServer"](../modules/_testing_twiliocallserver_.md) / CallServer

# Interface: CallServer

## Hierarchy

* [Emitter](_emitter_.emitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

  ↳ **CallServer**

## Implemented by

* [TwilioCallServer](../classes/_testing_twiliocallserver_.twiliocallserver.md)

## Index

### Methods

* [emit](_testing_twiliocallserver_.callserver.md#emit)
* [listen](_testing_twiliocallserver_.callserver.md#listen)
* [off](_testing_twiliocallserver_.callserver.md#off)
* [on](_testing_twiliocallserver_.callserver.md#on)
* [stop](_testing_twiliocallserver_.callserver.md#stop)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: CallServerEvents[K]): void

*Inherited from [Emitter](_emitter_.emitter.md).[emit](_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L13)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | CallServerEvents[K] |

**Returns:** void

___

### listen

▸ **listen**(`port`: number): Promise\<URL>

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:21](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`port` | number |

**Returns:** Promise\<URL>

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<CallServerEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[off](_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L12)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallServerEvents[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<CallServerEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[on](_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallServerEvents[K]> |

**Returns:** void

___

### stop

▸ **stop**(): void

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:22](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L22)*

**Returns:** void
