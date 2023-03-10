[IVR Tester](../README.md) / IvrTester

# Class: IvrTester

## Implements

* [*RunnableTester*](../interfaces/runnabletester.md)

## Table of contents

### Constructors

- [constructor](ivrtester.md#constructor)

### Properties

- [config](ivrtester.md#config)
- [pluginManager](ivrtester.md#pluginmanager)
- [running](ivrtester.md#running)

### Methods

- [preflightChecks](ivrtester.md#preflightchecks)
- [run](ivrtester.md#run)

## Constructors

### constructor

\+ **new IvrTester**(`configuration`: [*Config*](../interfaces/config.md)): [*IvrTester*](ivrtester.md)

#### Parameters:

Name | Type |
:------ | :------ |
`configuration` | [*Config*](../interfaces/config.md) |

**Returns:** [*IvrTester*](ivrtester.md)

Defined in: [testRunner.ts:88](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L88)

## Properties

### config

• `Private` `Readonly` **config**: [*Config*](../interfaces/config.md)

Defined in: [testRunner.ts:86](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L86)

___

### pluginManager

• `Private` `Readonly` **pluginManager**: [*PluginManager*](pluginmanager.md)

Defined in: [testRunner.ts:87](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L87)

___

### running

• `Private` **running**: *boolean*= false

Defined in: [testRunner.ts:88](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L88)

## Methods

### preflightChecks

▸ `Private`**preflightChecks**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [testRunner.ts:195](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L195)

___

### run

▸ **run**(`testSubject`: TestSubject, `scenario`: [*Scenario*](../interfaces/scenario.md) \| [*Scenario*](../interfaces/scenario.md)[]): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`testSubject` | TestSubject |
`scenario` | [*Scenario*](../interfaces/scenario.md) \| [*Scenario*](../interfaces/scenario.md)[] |

**Returns:** *Promise*<void\>

Implementation of: [RunnableTester](../interfaces/runnabletester.md)

Defined in: [testRunner.ts:104](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testRunner.ts#L104)
