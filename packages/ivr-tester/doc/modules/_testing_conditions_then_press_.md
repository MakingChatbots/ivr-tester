**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/conditions/then/press"

# Module: "testing/conditions/then/press"

## Index

### Functions

* [press](_testing_conditions_then_press_.md#press)

## Functions

### press

▸ `Const`**press**(`dtmfSequence`: string): [Then](../interfaces/_testing_conditions_then_then_.then.md)

*Defined in [packages/ivr-tester/src/testing/conditions/then/press.ts:8](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/testing/conditions/then/press.ts#L8)*

Sends DTMF tones to the call

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`dtmfSequence` | string | Supported digits are 0123456789*# and w. w represents a pause of 0.5s.  |

**Returns:** [Then](../interfaces/_testing_conditions_then_then_.then.md)
