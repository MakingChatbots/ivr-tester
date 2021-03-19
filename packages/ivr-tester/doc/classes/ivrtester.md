[IVR Tester](../README.md) / IvrTester

# Class: IvrTester

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

Defined in: [testRunner.ts:87](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L87)

## Properties

### config

• `Private` `Readonly` **config**: [*Config*](../interfaces/config.md)

Defined in: [testRunner.ts:85](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L85)

___

### pluginManager

• `Private` `Readonly` **pluginManager**: [*PluginManager*](pluginmanager.md)

Defined in: [testRunner.ts:86](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L86)

___

### running

• `Private` **running**: *boolean*= false

Defined in: [testRunner.ts:87](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L87)

## Methods

### preflightChecks

▸ `Private`**preflightChecks**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [testRunner.ts:171](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L171)

___

### run

▸ **run**(`call`: [*TestSubject*](../interfaces/testsubject.md) \| *Buffer*, `ivrTest`: [*CallFlowTestDefinition*](../interfaces/callflowtestdefinition.md) \| [*CallFlowTestDefinition*](../interfaces/callflowtestdefinition.md)[]): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`call` | [*TestSubject*](../interfaces/testsubject.md) \| *Buffer* |
`ivrTest` | [*CallFlowTestDefinition*](../interfaces/callflowtestdefinition.md) \| [*CallFlowTestDefinition*](../interfaces/callflowtestdefinition.md)[] |

**Returns:** *Promise*<void\>

Defined in: [testRunner.ts:94](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testRunner.ts#L94)
