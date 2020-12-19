**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/CloseServerWhenTestsComplete"](../modules/_testing_closeserverwhentestscomplete_.md) / CloseServerWhenTestsComplete

# Class: CloseServerWhenTestsComplete

Closes the server when all the tests complete

## Hierarchy

* **CloseServerWhenTestsComplete**

## Implements

* [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)

## Index

### Properties

* [server](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#server)
* [testsCompleted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#testscompleted)
* [totalTests](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#totaltests)
* [PluginName](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#pluginname)

### Methods

* [callAssignedTest](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#callassignedtest)
* [callHandlingServerStarted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#callhandlingserverstarted)
* [initialise](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#initialise)
* [name](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#name)
* [testCompleted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#testcompleted)

## Properties

### server

• `Private` **server**: Server

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L9)*

___

### testsCompleted

• `Private` **testsCompleted**: number = 0

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:11](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L11)*

___

### totalTests

• `Private` **totalTests**: number = 0

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L10)*

___

### PluginName

▪ `Static` `Private` `Readonly` **PluginName**: \"StopWhenAllTestsComplete\" = "StopWhenAllTestsComplete"

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L8)*

## Methods

### callAssignedTest

▸ `Private`**callAssignedTest**(): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:33](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L33)*

**Returns:** void

___

### callHandlingServerStarted

▸ `Private`**callHandlingServerStarted**(`__namedParameters`: { server: Server  }): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:27](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { server: Server  } |

**Returns:** void

___

### initialise

▸ **initialise**(`eventEmitter`: [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md)): void

*Implementation of [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)*

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:17](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`eventEmitter` | [LifecycleEventEmitter](../interfaces/_plugins_lifecycle_lifecycleeventemitter_.lifecycleeventemitter.md) |

**Returns:** void

___

### name

▸ **name**(): string

*Implementation of [LifecycleHookPlugin](../interfaces/_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)*

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:13](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L13)*

**Returns:** string

___

### testCompleted

▸ `Private`**testCompleted**(): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:37](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L37)*

**Returns:** void
