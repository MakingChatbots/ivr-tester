**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/IvrTesterPlugin"](../modules/_plugins_ivrtesterplugin_.md) / IvrTesterPlugin

# Interface: IvrTesterPlugin

Interface for developing a plugin that hooks into the life-cycle of a
test.

## Hierarchy

* **IvrTesterPlugin**

  ↳ [ConsoleLoggerPlugin](_testing_reporting_consoleuserinterface_.consoleloggerplugin.md)

## Implemented by

* [CloseServerWhenTestsComplete](../classes/_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md)

## Index

### Methods

* [initialise](_plugins_ivrtesterplugin_.ivrtesterplugin.md#initialise)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [Emitter](_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>): void

*Defined in [packages/ivr-tester/src/plugins/IvrTesterPlugin.ts:9](https://github.com/SketchingDev/ivr-tester/blob/0888491/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`eventEmitter` | [Emitter](_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

**Returns:** void
