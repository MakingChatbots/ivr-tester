[IVR Tester](../README.md) / Then

# Interface: Then

An action performed when a condition is met

## Table of contents

### Methods

- [describe](then.md#describe)
- [do](then.md#do)

## Methods

### describe

▸ **describe**(): *string*

Returns a description of this action e.g. "press the keys 123#"

When thinking of the wording keep in mind that in the logs this
description follows the word 'Then' e.g. "Then press the keys 123#".

**Returns:** *string*

Defined in: [testing/test/conditions/then/Then.ts:13](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/then/Then.ts#L13)

___

### do

▸ **do**(`call`: *Call*): *void*

Performs the action to the call

#### Parameters:

Name | Type |
:------ | :------ |
`call` | *Call* |

**Returns:** *void*

Defined in: [testing/test/conditions/then/Then.ts:18](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/then/Then.ts#L18)
