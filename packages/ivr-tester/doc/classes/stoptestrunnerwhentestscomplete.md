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

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:7](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L7)

___

### totalFailed

• `Private` **totalFailed**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:10](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L10)

___

### totalRunning

• `Private` **totalRunning**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:8](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L8)

___

### totalSuccessful

• `Private` **totalSuccessful**: *number*= 0

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:9](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L9)

## Methods

### initialise

▸ **initialise**(`_`: *PluginHost*, `testRunner`: [*TestRunner*](../interfaces/testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`_` | *PluginHost* |
`testRunner` | [*TestRunner*](../interfaces/testrunner.md) |

**Returns:** *void*

Implementation of: [IvrTesterPlugin](../interfaces/ivrtesterplugin.md)

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:12](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L12)

___

### testCompleted

▸ `Private`**testCompleted**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:38](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L38)

___

### testFailed

▸ `Private`**testFailed**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:33](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L33)

___

### testStarted

▸ **testStarted**(`testSession`: [*TestSession*](../interfaces/testsession.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`testSession` | [*TestSession*](../interfaces/testsession.md) |

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:16](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L16)

___

### testSuccessful

▸ `Private`**testSuccessful**(): *void*

**Returns:** *void*

Defined in: [testing/StopTestRunnerWhenTestsComplete.ts:28](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/StopTestRunnerWhenTestsComplete.ts#L28)
