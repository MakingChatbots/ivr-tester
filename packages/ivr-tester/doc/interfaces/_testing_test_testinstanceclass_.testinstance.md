**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/test/TestInstanceClass"](../modules/_testing_test_testinstanceclass_.md) / TestInstance

# Interface: TestInstance

## Hierarchy

* [Emitter](_emitter_.emitter.md)\<[TestInstanceEvents](../modules/_testing_test_testinstanceclass_.md#testinstanceevents)>

  ↳ **TestInstance**

## Index

### Methods

* [emit](_testing_test_testinstanceclass_.testinstance.md#emit)
* [getCall](_testing_test_testinstanceclass_.testinstance.md#getcall)
* [getTest](_testing_test_testinstanceclass_.testinstance.md#gettest)
* [off](_testing_test_testinstanceclass_.testinstance.md#off)
* [on](_testing_test_testinstanceclass_.testinstance.md#on)

## Methods

### emit

▸ **emit**\<K>(`eventName`: K, `params`: TestInstanceEvents[K]): void

*Inherited from [Emitter](_emitter_.emitter.md).[emit](_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/Emitter.ts#L13)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TestInstanceEvents](../modules/_testing_test_testinstanceclass_.md#testinstanceevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | TestInstanceEvents[K] |

**Returns:** void

___

### getCall

▸ **getCall**(): [Call](_call_call_.call.md)

*Defined in [packages/ivr-tester/src/testing/test/TestInstanceClass.ts:47](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/testing/test/TestInstanceClass.ts#L47)*

**Returns:** [Call](_call_call_.call.md)

___

### getTest

▸ **getTest**(): [IvrTest](_testing_test_ivrtest_.ivrtest.md)

*Defined in [packages/ivr-tester/src/testing/test/TestInstanceClass.ts:46](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/testing/test/TestInstanceClass.ts#L46)*

**Returns:** [IvrTest](_testing_test_ivrtest_.ivrtest.md)

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<TestInstanceEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[off](_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/Emitter.ts#L12)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TestInstanceEvents](../modules/_testing_test_testinstanceclass_.md#testinstanceevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TestInstanceEvents[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<TestInstanceEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[on](_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[TestInstanceEvents](../modules/_testing_test_testinstanceclass_.md#testinstanceevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<TestInstanceEvents[K]> |

**Returns:** void
