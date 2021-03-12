[IVR Tester](../README.md) / CloseServerWhenTestsComplete

# Class: CloseServerWhenTestsComplete

Closes the server when all the tests complete

## Implements

* [*IvrTesterPlugin*](../interfaces/ivrtesterplugin.md)

## Table of contents

### Constructors

- [constructor](closeserverwhentestscomplete.md#constructor)

### Properties

- [server](closeserverwhentestscomplete.md#server)
- [testsCompleted](closeserverwhentestscomplete.md#testscompleted)
- [totalTests](closeserverwhentestscomplete.md#totaltests)

### Methods

- [callHandlingServerStarted](closeserverwhentestscomplete.md#callhandlingserverstarted)
- [initialise](closeserverwhentestscomplete.md#initialise)
- [testCompleted](closeserverwhentestscomplete.md#testcompleted)
- [testStarted](closeserverwhentestscomplete.md#teststarted)

## Constructors

### constructor

\+ **new CloseServerWhenTestsComplete**(): [*CloseServerWhenTestsComplete*](closeserverwhentestscomplete.md)

**Returns:** [*CloseServerWhenTestsComplete*](closeserverwhentestscomplete.md)

## Properties

### server

• `Private` **server**: *CallServer*

Defined in: [testing/CloseServerWhenTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L8)

___

### testsCompleted

• `Private` **testsCompleted**: *number*= 0

Defined in: [testing/CloseServerWhenTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L10)

___

### totalTests

• `Private` **totalTests**: *number*= 0

Defined in: [testing/CloseServerWhenTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L9)

## Methods

### callHandlingServerStarted

▸ `Private`**callHandlingServerStarted**(`callServer`: *CallServer*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callServer` | *CallServer* |

**Returns:** *void*

Defined in: [testing/CloseServerWhenTestsComplete.ts:31](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L31)

___

### initialise

▸ **initialise**(`eventEmitter`: [*Emitter*](../interfaces/emitter.md)<PluginEvents\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`eventEmitter` | [*Emitter*](../interfaces/emitter.md)<PluginEvents\> |

**Returns:** *void*

Implementation of: [IvrTesterPlugin](../interfaces/ivrtesterplugin.md)

Defined in: [testing/CloseServerWhenTestsComplete.ts:12](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L12)

___

### testCompleted

▸ `Private`**testCompleted**(): *void*

**Returns:** *void*

Defined in: [testing/CloseServerWhenTestsComplete.ts:39](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L39)

___

### testStarted

▸ `Private`**testStarted**(): *void*

**Returns:** *void*

Defined in: [testing/CloseServerWhenTestsComplete.ts:35](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/CloseServerWhenTestsComplete.ts#L35)
