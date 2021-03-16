[IVR Tester](../README.md) / IvrTesterPlugin

# Interface: IvrTesterPlugin

Interface for developing a plugin that hooks into the life-cycle of a
test.

## Hierarchy

* **IvrTesterPlugin**

  ↳ [*ConsoleLoggerPlugin*](consoleloggerplugin.md)

## Implemented by

* [*CloseServerWhenTestsComplete*](../classes/closeserverwhentestscomplete.md)

## Table of contents

### Methods

- [initialise](ivrtesterplugin.md#initialise)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [*Emitter*](emitter.md)<PluginEvents\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`eventEmitter` | [*Emitter*](emitter.md)<PluginEvents\> |

**Returns:** *void*

Defined in: [plugins/IvrTesterPlugin.ts:9](https://github.com/SketchingDev/ivr-tester/blob/d22226c/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L9)
