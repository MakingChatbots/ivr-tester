**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/conditions/then/press"

# Module: "testing/test/conditions/then/press"

## Index

### Functions

* [press](_testing_test_conditions_then_press_.md#press)

## Functions

### press

▸ `Const`**press**(`dtmfSequence`: string): [Then](../interfaces/_testing_test_conditions_then_then_.then.md)

*Defined in [packages/ivr-tester/src/testing/test/conditions/then/press.ts:8](https://github.com/SketchingDev/ivr-tester/blob/60c8b59/packages/ivr-tester/src/testing/test/conditions/then/press.ts#L8)*

Sends DTMF tones to the call

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`dtmfSequence` | string | Supported digits are 0123456789*# and w. w represents a pause of 0.5s.  |

**Returns:** [Then](../interfaces/_testing_test_conditions_then_then_.then.md)
