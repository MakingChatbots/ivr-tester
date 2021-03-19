[IVR Tester](../README.md) / ConsoleLoggerPlugin

# Interface: ConsoleLoggerPlugin

## Hierarchy

* [*IvrTesterPlugin*](ivrtesterplugin.md)

  ↳ **ConsoleLoggerPlugin**

## Table of contents

### Properties

- [testStarted](consoleloggerplugin.md#teststarted)

### Methods

- [initialise](consoleloggerplugin.md#initialise)
- [timedOut](consoleloggerplugin.md#timedout)

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

Defined in: [plugins/IvrTesterPlugin.ts:11](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L11)

Inherited from: [IvrTesterPlugin](ivrtesterplugin.md).[testStarted](ivrtesterplugin.md#teststarted)

Defined in: [plugins/IvrTesterPlugin.ts:11](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L11)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [*Emitter*](emitter.md)<PluginEvents\>, `testRunner`: [*TestRunner*](testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`eventEmitter` | [*Emitter*](emitter.md)<PluginEvents\> |
`testRunner` | [*TestRunner*](testrunner.md) |

**Returns:** *void*

Inherited from: [IvrTesterPlugin](ivrtesterplugin.md)

Defined in: [plugins/IvrTesterPlugin.ts:10](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L10)

___

### timedOut

▸ **timedOut**(`reason`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`reason` | *string* |

**Returns:** *void*

Defined in: [testing/ui/consoleUserInterface.ts:143](https://github.com/SketchingDev/ivr-tester/blob/cfb72a0/packages/ivr-tester/src/testing/ui/consoleUserInterface.ts#L143)
