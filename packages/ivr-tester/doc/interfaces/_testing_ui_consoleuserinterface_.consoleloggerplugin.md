**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/ui/consoleUserInterface"](../modules/_testing_ui_consoleuserinterface_.md) / ConsoleLoggerPlugin

# Interface: ConsoleLoggerPlugin

## Hierarchy

* [IvrTesterPlugin](_plugins_ivrtesterplugin_.ivrtesterplugin.md)

  ↳ **ConsoleLoggerPlugin**

## Index

### Methods

* [initialise](_testing_ui_consoleuserinterface_.consoleloggerplugin.md#initialise)
* [timedOut](_testing_ui_consoleuserinterface_.consoleloggerplugin.md#timedout)

## Methods

### initialise

▸ **initialise**(`eventEmitter`: [Emitter](_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>): void

*Inherited from [IvrTesterPlugin](_plugins_ivrtesterplugin_.ivrtesterplugin.md).[initialise](_plugins_ivrtesterplugin_.ivrtesterplugin.md#initialise)*

*Defined in [packages/ivr-tester/src/plugins/IvrTesterPlugin.ts:9](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/plugins/IvrTesterPlugin.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`eventEmitter` | [Emitter](_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

**Returns:** void

___

### timedOut

▸ **timedOut**(`reason`: string): void

*Defined in [packages/ivr-tester/src/testing/ui/consoleUserInterface.ts:108](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/ui/consoleUserInterface.ts#L108)*

#### Parameters:

Name | Type |
------ | ------ |
`reason` | string |

**Returns:** void
