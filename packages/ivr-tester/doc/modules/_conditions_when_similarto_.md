**[IVR Tester](../README.md)**

> [Globals](../README.md) / "conditions/when/similarTo"

# Module: "conditions/when/similarTo"

## Index

### Functions

* [similarTo](_conditions_when_similarto_.md#similarto)

## Functions

### similarTo

▸ `Const`**similarTo**(`similarText`: string, `similarityThreshold?`: number): [When](_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/conditions/when/similarTo.ts:12](https://github.com/SketchingDev/ivr-tester/blob/72537d4/packages/ivr-tester/src/conditions/when/similarTo.ts#L12)*

Compares two strings to determine if they're similar.
See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`similarText` | string | - | Text that is compared to the transcript for similarity |
`similarityThreshold` | number | 0.8 | The degree of similarity is measured in a fraction between 0 and 1. 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.  |

**Returns:** [When](_conditions_when_when_.md#when)
