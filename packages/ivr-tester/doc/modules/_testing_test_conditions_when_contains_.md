**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/conditions/when/contains"

# Module: "testing/test/conditions/when/contains"

## Index

### Interfaces

* [ContainsConfig](../interfaces/_testing_test_conditions_when_contains_.containsconfig.md)

### Functions

* [contains](_testing_test_conditions_when_contains_.md#contains)

## Functions

### contains

▸ `Const`**contains**(`partialOrWhen`: string \| string[] \| [When](_testing_test_conditions_when_when_.md#when), `__namedParameters?`: { ignoreCasing: boolean = true }): [When](_testing_test_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/testing/test/conditions/when/contains.ts:36](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/testing/test/conditions/when/contains.ts#L36)*

Evaluates whether a transcript contains
* Either a piece of text if a string is provided
* Every piece of text if array is provided
* When condition passes, having been passed every portion of
  the transcript until it returns true, else will return false.

```
contains(['test', 'transcript'])('this is a test transcript') //true
```

```
contains('test')('this is a test transcript') // true
```

```
contains(similarTo('this is a best'))('this is a test transcript') // true
```

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`partialOrWhen` | string \| string[] \| [When](_testing_test_conditions_when_when_.md#when) | - |
`__namedParameters` | { ignoreCasing: boolean = true } | {} |

**Returns:** [When](_testing_test_conditions_when_when_.md#when)
