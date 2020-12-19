**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/conditions/then/Then"](../modules/_testing_conditions_then_then_.md) / Then

# Interface: Then

An action performed when a condition is met

## Hierarchy

* **Then**

## Index

### Methods

* [describe](_testing_conditions_then_then_.then.md#describe)
* [do](_testing_conditions_then_then_.then.md#do)

## Methods

### describe

▸ **describe**(): string

*Defined in [packages/ivr-tester/src/testing/conditions/then/Then.ts:13](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/testing/conditions/then/Then.ts#L13)*

Returns a description of this action e.g. "press the keys 123#"

When thinking of the wording keep in mind that in the logs this
description follows the word 'Then' e.g. "Then press the keys 123#".

**Returns:** string

___

### do

▸ **do**(`call`: [Call](_call_call_.call.md)): void

*Defined in [packages/ivr-tester/src/testing/conditions/then/Then.ts:18](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/testing/conditions/then/Then.ts#L18)*

Performs the action to the call

#### Parameters:

Name | Type |
------ | ------ |
`call` | [Call](_call_call_.call.md) |

**Returns:** void
