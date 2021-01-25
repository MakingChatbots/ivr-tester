**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/conditions/when/similarTo"

# Module: "testing/test/conditions/when/similarTo"

## Index

### Functions

* [similarTo](_testing_test_conditions_when_similarto_.md#similarto)

## Functions

### similarTo

▸ `Const`**similarTo**(`similarText`: string, `similarityThreshold?`: number): [When](_testing_test_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/testing/test/conditions/when/similarTo.ts:12](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/testing/test/conditions/when/similarTo.ts#L12)*

Compares two strings to determine if they're similar.
See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`similarText` | string | - | Text that is compared to the transcript for similarity |
`similarityThreshold` | number | 0.8 | The degree of similarity is measured in a fraction between 0 and 1. 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.  |

**Returns:** [When](_testing_test_conditions_when_when_.md#when)
