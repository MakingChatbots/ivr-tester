[IVR Tester](../README.md) / IvrTesterPlugin

# Interface: IvrTesterPlugin

Interface for developing a plugin that hooks into the life-cycle of a
test.

## Implemented by

* [*StopTestRunnerWhenTestsComplete*](../classes/stoptestrunnerwhentestscomplete.md)

## Table of contents

### Properties

- [testStarted](ivrtesterplugin.md#teststarted)

### Methods

- [initialise](ivrtesterplugin.md#initialise)

## Properties

### testStarted

• `Optional` **testStarted**: (`testSession`: [*TestSession*](testsession.md)) => *void*

#### Type declaration:

▸ (`testSession`: [*TestSession*](testsession.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`testSession` | [*TestSession*](testsession.md) |

**Returns:** *void*

Defined in: [plugins/IvrTesterPlugin.ts:10](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L10)

Defined in: [plugins/IvrTesterPlugin.ts:10](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L10)

## Methods

### initialise

▸ **initialise**(`pluginManager`: *PluginHost*, `testRunner`: [*TestRunner*](testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`pluginManager` | *PluginHost* |
`testRunner` | [*TestRunner*](testrunner.md) |

**Returns:** *void*

Defined in: [plugins/IvrTesterPlugin.ts:9](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L9)
