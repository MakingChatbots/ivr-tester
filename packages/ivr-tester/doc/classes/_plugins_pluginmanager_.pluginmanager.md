**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/PluginManager"](../modules/_plugins_pluginmanager_.md) / PluginManager

# Class: PluginManager

## Hierarchy

* **PluginManager**

## Index

### Constructors

* [constructor](_plugins_pluginmanager_.pluginmanager.md#constructor)

### Properties

* [lifecycleEventEmitter](_plugins_pluginmanager_.pluginmanager.md#lifecycleeventemitter)

### Methods

* [getEmitter](_plugins_pluginmanager_.pluginmanager.md#getemitter)
* [loadPlugins](_plugins_pluginmanager_.pluginmanager.md#loadplugins)

## Constructors

### constructor

\+ **new PluginManager**(`lifecycleEventEmitter?`: [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)): [PluginManager](_plugins_pluginmanager_.pluginmanager.md)

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:7](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/PluginManager.ts#L7)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`lifecycleEventEmitter` | [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md) | createLifecycleEventEmitter() |

**Returns:** [PluginManager](_plugins_pluginmanager_.pluginmanager.md)

## Properties

### lifecycleEventEmitter

• `Private` `Readonly` **lifecycleEventEmitter**: [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:9](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/PluginManager.ts#L9)*

## Methods

### getEmitter

▸ **getEmitter**(): [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:18](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/PluginManager.ts#L18)*

**Returns:** [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)

___

### loadPlugins

▸ **loadPlugins**(`plugins`: [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)[]): void

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:12](https://github.com/SketchingDev/ivr-tester/blob/8c13d10/packages/ivr-tester/src/plugins/PluginManager.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`plugins` | [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)[] |

**Returns:** void
