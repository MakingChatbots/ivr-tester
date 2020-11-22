**[IVR Tester](../README.md)**

> [Globals](../README.md) / "conditions/when/hasPart"

# Module: "conditions/when/hasPart"

## Index

### Functions

* [hasPart](_conditions_when_haspart_.md#haspart)

## Functions

### hasPart

▸ `Const`**hasPart**(`when`: [When](_conditions_when_when_.md#when)): [When](_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/conditions/when/hasPart.ts:19](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/conditions/when/hasPart.ts#L19)*

Splits the transcript into parts which are then passed to the argument When.

The transcript "press key 1" is split into the following parts, each of which are
passed to the argument.
  * press
  * press key
  * press key 1
  * key
  * key 1
  * 1

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`when` | [When](_conditions_when_when_.md#when) | Called with each of part of the transcript  |

**Returns:** [When](_conditions_when_when_.md#when)
