[IVR Tester](../README.md) / StopTestRunnerWhenTestsComplete

# Class: StopTestRunnerWhenTestsComplete

Stops the test run when all the tests complete

## Implements

* [*IvrTesterPlugin*](../interfaces/ivrtesterplugin.md)

## Table of contents

### Constructors

- [constructor](stoptestrunnerwhentestscomplete.md#constructor)

### Properties

- [testRunner](stoptestrunnerwhentestscomplete.md#testrunner)
- [totalFailed](stoptestrunnerwhentestscomplete.md#totalfailed)
- [totalRunning](stoptestrunnerwhentestscomplete.md#totalrunning)
- [totalSuccessful](stoptestrunnerwhentestscomplete.md#totalsuccessful)

### Methods

- [initialise](stoptestrunnerwhentestscomplete.md#initialise)
- [testCompleted](stoptestrunnerwhentestscomplete.md#testcompleted)
- [testFailed](stoptestrunnerwhentestscomplete.md#testfailed)
- [testStarted](stoptestrunnerwhentestscomplete.md#teststarted)
- [testSuccessful](stoptestrunnerwhentestscomplete.md#testsuccessful)

## Constructors

### constructor

\+ **new StopTestRunnerWhenTestsComplete**(): [*StopTestRunnerWhenTestsComplete*](stoptestrunnerwhentestscomplete.md)

**Returns:** [*StopTestRunnerWhenTestsComplete*](stoptestrunnerwhentestscomplete.md)

## Properties

### testRunner

• `Private` **testRunner**: [*TestRunner*](../interfaces/testrunner.md)

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L8)

___

### totalFailed

• `Private` **totalFailed**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:11](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L11)

___

### totalRunning

• `Private` **totalRunning**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L9)

___

### totalSuccessful

• `Private` **totalSuccessful**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L10)

## Methods

### initialise

▸ **initialise**(`_`: [*Emitter*](../interfaces/emitter.md)<PluginEvents\>, `testRunner`: [*TestRunner*](../interfaces/testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`_` | [*Emitter*](../interfaces/emitter.md)<PluginEvents\> |
`testRunner` | [*TestRunner*](../interfaces/testrunner.md) |

**Returns:** *void*

Implementation of: [IvrTesterPlugin](../interfaces/ivrtesterplugin.md)

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:13](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L13)

___

### testCompleted

▸ `Private`**testCompleted**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:39](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L39)

___

### testFailed

▸ `Private`**testFailed**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:34](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L34)

___

### testStarted

▸ **testStarted**(`testSession`: [*TestSession*](../interfaces/testsession.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`testSession` | [*TestSession*](../interfaces/testsession.md) |

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:17](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L17)

___

### testSuccessful

▸ `Private`**testSuccessful**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:29](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L29)
