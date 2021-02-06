**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/IteratingTestAssigner"](../modules/_testing_iteratingtestassigner_.md) / IteratingTestAssigner

# Class: IteratingTestAssigner

## Hierarchy

* **IteratingTestAssigner**

## Implements

* [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md)

## Index

### Constructors

* [constructor](_testing_iteratingtestassigner_.iteratingtestassigner.md#constructor)

### Properties

* [testIterator](_testing_iteratingtestassigner_.iteratingtestassigner.md#testiterator)
* [tests](_testing_iteratingtestassigner_.iteratingtestassigner.md#tests)

### Methods

* [assign](_testing_iteratingtestassigner_.iteratingtestassigner.md#assign)

## Constructors

### constructor

\+ **new IteratingTestAssigner**(`tests`: [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md)[]): [IteratingTestAssigner](_testing_iteratingtestassigner_.iteratingtestassigner.md)

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:22](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`tests` | [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md)[] |

**Returns:** [IteratingTestAssigner](_testing_iteratingtestassigner_.iteratingtestassigner.md)

## Properties

### testIterator

• `Private` `Readonly` **testIterator**: IterableIterator\<[number, [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md)]>

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:22](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L22)*

___

### tests

• `Readonly` **tests**: [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md)[]

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:24](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L24)*

## Methods

### assign

▸ **assign**(): [TestAssigned](../interfaces/_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](../interfaces/_testing_iteratingtestassigner_.noneassigned.md)

*Implementation of [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md)*

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:28](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L28)*

**Returns:** [TestAssigned](../interfaces/_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](../interfaces/_testing_iteratingtestassigner_.noneassigned.md)
