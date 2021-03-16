[IVR Tester](../README.md) / ConsoleLoggerPlugin

# Interface: ConsoleLoggerPlugin

## Hierarchy

* [*IvrTesterPlugin*](ivrtesterplugin.md)

  ↳ **ConsoleLoggerPlugin**

## Table of contents

### Methods

- [initialise](consoleloggerplugin.md#initialise)
- [timedOut](consoleloggerplugin.md#timedout)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [*Emitter*](emitter.md)<PluginEvents\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`eventEmitter` | [*Emitter*](emitter.md)<PluginEvents\> |

**Returns:** *void*

Inherited from: [IvrTesterPlugin](ivrtesterplugin.md)

Defined in: [plugins/IvrTesterPlugin.ts:9](https://github.com/SketchingDev/ivr-tester/blob/d22226c/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L9)

___

### timedOut

▸ **timedOut**(`reason`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`reason` | *string* |

**Returns:** *void*

Defined in: [testing/ui/consoleUserInterface.ts:144](https://github.com/SketchingDev/ivr-tester/blob/d22226c/packages/ivr-tester/src/testing/ui/consoleUserInterface.ts#L144)
