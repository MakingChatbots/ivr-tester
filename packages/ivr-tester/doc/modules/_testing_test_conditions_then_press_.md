**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/conditions/then/press"

# Module: "testing/test/conditions/then/press"

## Index

### Interfaces

* [PressConfig](../interfaces/_testing_test_conditions_then_press_.pressconfig.md)

### Functions

* [press](_testing_test_conditions_then_press_.md#press)

## Functions

### press

▸ `Const`**press**(`dtmfSequence`: string, `__namedParameters?`: { disableAutomaticSlowdown: boolean = false }): [Then](../interfaces/_testing_test_conditions_then_then_.then.md)

*Defined in [packages/ivr-tester/src/testing/test/conditions/then/press.ts:37](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/test/conditions/then/press.ts#L37)*

Sends DTMF tones to the call

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`dtmfSequence` | string | - | Supported digits are 0123456789*# and w. w represents a pause of 0.5s. |
`__namedParameters` | { disableAutomaticSlowdown: boolean = false } | {} | - |

**Returns:** [Then](../interfaces/_testing_test_conditions_then_then_.then.md)
