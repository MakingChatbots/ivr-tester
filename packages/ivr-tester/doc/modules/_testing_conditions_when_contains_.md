**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/conditions/when/contains"

# Module: "testing/conditions/when/contains"

## Index

### Interfaces

* [containsConfig](../interfaces/_testing_conditions_when_contains_.containsconfig.md)

### Functions

* [contains](_testing_conditions_when_contains_.md#contains)

## Functions

### contains

▸ `Const`**contains**(`partialOrWhen`: string \| [When](_testing_conditions_when_when_.md#when), `__namedParameters?`: { ignoreCasing: boolean = true }): [When](_testing_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/testing/conditions/when/contains.ts:30](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/testing/conditions/when/contains.ts#L30)*

Evaluates whether a transcript contains either a piece of text or if
passed a When condition will pass then When condition every portion of
the transcript until it returns true, else will return false.

```
contains('test')('this is a test transcript') // true
```

```
contains(similarTo('this is a best'))('this is a test transcript') // true
```

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`partialOrWhen` | string \| [When](_testing_conditions_when_when_.md#when) | - |
`__namedParameters` | { ignoreCasing: boolean = true } | {} |

**Returns:** [When](_testing_conditions_when_when_.md#when)
