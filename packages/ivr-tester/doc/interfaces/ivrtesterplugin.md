[IVR Tester](../README.md) / IvrTesterPlugin

# Interface: IvrTesterPlugin

Interface for developing a plugin that hooks into the life-cycle of a
test.

## Hierarchy

* **IvrTesterPlugin**

  ↳ [*ConsoleLoggerPlugin*](consoleloggerplugin.md)

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

Defined in: [plugins/IvrTesterPlugin.ts:11](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L11)

Defined in: [plugins/IvrTesterPlugin.ts:11](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L11)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [*Emitter*](emitter.md)<PluginEvents\>, `testRunner`: [*TestRunner*](testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`eventEmitter` | [*Emitter*](emitter.md)<PluginEvents\> |
`testRunner` | [*TestRunner*](testrunner.md) |

**Returns:** *void*

Defined in: [plugins/IvrTesterPlugin.ts:10](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L10)
