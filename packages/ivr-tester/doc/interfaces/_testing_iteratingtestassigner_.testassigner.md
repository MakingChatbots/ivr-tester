**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/IteratingTestAssigner"](../modules/_testing_iteratingtestassigner_.md) / TestAssigner

# Interface: TestAssigner

The number of calls that are made reflect the amount of tests needed
to be run. As each call's stream connects this is used to determine
the test that should be run

## Hierarchy

* **TestAssigner**

## Implemented by

* [IteratingTestAssigner](../classes/_testing_iteratingtestassigner_.iteratingtestassigner.md)

## Index

### Methods

* [assign](_testing_iteratingtestassigner_.testassigner.md#assign)

## Methods

### assign

▸ **assign**(): [TestAssigned](_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](_testing_iteratingtestassigner_.noneassigned.md)

*Defined in [packages/ivr-tester/src/testing/IteratingTestAssigner.ts:23](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/testing/IteratingTestAssigner.ts#L23)*

**Returns:** [TestAssigned](_testing_iteratingtestassigner_.testassigned.md) \| [NoneAssigned](_testing_iteratingtestassigner_.noneassigned.md)
