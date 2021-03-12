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

\+ **new IteratingTestAssigner**(`tests`: [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md)[]): [IteratingTestAssigner](_testing_iteratingtestassigner_.iteratingtestassigner.md)

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:29](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`tests` | [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md)[] |

**Returns:** [IteratingTestAssigner](_testing_iteratingtestassigner_.iteratingtestassigner.md)

## Properties

### testIterator

• `Private` `Readonly` **testIterator**: IterableIterator\<[number, [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md)]>

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:27](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L27)*

___

### tests

• `Readonly` **tests**: [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md)[]

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:31](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L31)*

## Methods

### assign

▸ **assign**(): [TestAssigned](../interfaces/_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](../interfaces/_testing_iteratingtestassigner_.noneassigned.md)

*Implementation of [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md)*

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:35](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L35)*

**Returns:** [TestAssigned](../interfaces/_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](../interfaces/_testing_iteratingtestassigner_.noneassigned.md)
