**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["conditions/then/Then"](../modules/_conditions_then_then_.md) / Then

# Interface: Then

An action performed when a condition is met

## Hierarchy

* **Then**

## Index

### Methods

* [describe](_conditions_then_then_.then.md#describe)
* [do](_conditions_then_then_.then.md#do)

## Methods

### describe

▸ **describe**(): string

*Defined in [packages/ivr-tester/src/conditions/then/Then.ts:13](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/conditions/then/Then.ts#L13)*

Returns a description of this action e.g. "press the keys 123#"

When thinking of the wording keep in mind that in the logs this
description follows the word 'Then' e.g. "Then press the keys 123#".

**Returns:** string

___

### do

▸ **do**(`call`: Call): void

*Defined in [packages/ivr-tester/src/conditions/then/Then.ts:15](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/conditions/then/Then.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | Call |

**Returns:** void
