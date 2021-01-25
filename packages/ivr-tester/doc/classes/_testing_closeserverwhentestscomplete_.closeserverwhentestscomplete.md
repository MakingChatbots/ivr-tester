**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/CloseServerWhenTestsComplete"](../modules/_testing_closeserverwhentestscomplete_.md) / CloseServerWhenTestsComplete

# Class: CloseServerWhenTestsComplete

Closes the server when all the tests complete

## Hierarchy

* **CloseServerWhenTestsComplete**

## Implements

* [IvrTesterPlugin](../interfaces/_plugins_ivrtesterplugin_.ivrtesterplugin.md)

## Index

### Properties

* [server](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#server)
* [testsCompleted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#testscompleted)
* [totalTests](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#totaltests)

### Methods

* [callHandlingServerStarted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#callhandlingserverstarted)
* [initialise](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#initialise)
* [testCompleted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#testcompleted)
* [testStarted](_testing_closeserverwhentestscomplete_.closeserverwhentestscomplete.md#teststarted)

## Properties

### server

• `Private` **server**: [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L8)*

___

### testsCompleted

• `Private` **testsCompleted**: number = 0

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L10)*

___

### totalTests

• `Private` **totalTests**: number = 0

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L9)*

## Methods

### callHandlingServerStarted

▸ `Private`**callHandlingServerStarted**(`callServer`: [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:25](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`callServer` | [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md) |

**Returns:** void

___

### initialise

▸ **initialise**(`eventEmitter`: [Emitter](../interfaces/_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>): void

*Implementation of [IvrTesterPlugin](../interfaces/_plugins_ivrtesterplugin_.ivrtesterplugin.md)*

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:12](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`eventEmitter` | [Emitter](../interfaces/_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

**Returns:** void

___

### testCompleted

▸ `Private`**testCompleted**(): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:33](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L33)*

**Returns:** void

___

### testStarted

▸ `Private`**testStarted**(): void

*Defined in [packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts:29](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L29)*

**Returns:** void
