**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/lifecycle/StopWhenAllTestsComplete"](../modules/_plugins_lifecycle_stopwhenalltestscomplete_.md) / StopWhenAllTestsComplete

# Class: StopWhenAllTestsComplete

## Hierarchy

* **StopWhenAllTestsComplete**

## Implements

* [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)

## Index

### Properties

* [server](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#server)
* [testsCompleted](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#testscompleted)
* [totalTests](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#totaltests)
* [PluginName](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#pluginname)

### Methods

* [callAssignedTest](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#callassignedtest)
* [callHandlingServerStarted](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#callhandlingserverstarted)
* [initialise](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#initialise)
* [name](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#name)
* [testCompleted](_plugins_lifecycle_stopwhenalltestscomplete_.stopwhenalltestscomplete.md#testcompleted)

## Properties

### server

• `Private` **server**: Server

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L8)*

___

### testsCompleted

• `Private` **testsCompleted**: number = 0

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L10)*

___

### totalTests

• `Private` **totalTests**: number = 0

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L9)*

___

### PluginName

▪ `Static` `Private` `Readonly` **PluginName**: \"StopWhenAllTestsComplete\" = "StopWhenAllTestsComplete"

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:7](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L7)*

## Methods

### callAssignedTest

▸ `Private`**callAssignedTest**(): void

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:32](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L32)*

**Returns:** void

___

### callHandlingServerStarted

▸ `Private`**callHandlingServerStarted**(`__namedParameters`: { server: Server  }): void

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:26](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { server: Server  } |

**Returns:** void

___

### initialise

▸ **initialise**(`eventEmitter`: [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)): void

*Implementation of [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)*

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:16](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`eventEmitter` | [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md) |

**Returns:** void

___

### name

▸ **name**(): string

*Implementation of [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)*

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:12](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L12)*

**Returns:** string

___

### testCompleted

▸ `Private`**testCompleted**(): void

*Defined in [packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts:36](https://github.com/SketchingDev/ivr-tester/blob/adf22c5/packages/ivr-tester/src/plugins/lifecycle/StopWhenAllTestsComplete.ts#L36)*

**Returns:** void
