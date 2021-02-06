**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/DefaultTestExecutor"](../modules/_testing_defaulttestexecutor_.md) / DefaultTestExecutor

# Class: DefaultTestExecutor

## Hierarchy

* **DefaultTestExecutor**

## Implements

* [TestExecutor](../interfaces/_testing_defaulttestexecutor_.testexecutor.md)

## Index

### Constructors

* [constructor](_testing_defaulttestexecutor_.defaulttestexecutor.md#constructor)

### Properties

* [completeTranscriptionTimeoutInMs](_testing_defaulttestexecutor_.defaulttestexecutor.md#completetranscriptiontimeoutinms)
* [transcriberFactory](_testing_defaulttestexecutor_.defaulttestexecutor.md#transcriberfactory)

### Methods

* [startTest](_testing_defaulttestexecutor_.defaulttestexecutor.md#starttest)

## Constructors

### constructor

\+ **new DefaultTestExecutor**(`transcriberFactory`: [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory), `completeTranscriptionTimeoutInMs`: number): [DefaultTestExecutor](_testing_defaulttestexecutor_.defaulttestexecutor.md)

*Defined in [packages/ivr-tester/src/testing/DefaultTestExecutor.ts:11](https://github.com/SketchingDev/ivr-tester/blob/2e93db6/packages/ivr-tester/src/testing/DefaultTestExecutor.ts#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`transcriberFactory` | [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory) |
`completeTranscriptionTimeoutInMs` | number |

**Returns:** [DefaultTestExecutor](_testing_defaulttestexecutor_.defaulttestexecutor.md)

## Properties

### completeTranscriptionTimeoutInMs

• `Private` `Readonly` **completeTranscriptionTimeoutInMs**: number

*Defined in [packages/ivr-tester/src/testing/DefaultTestExecutor.ts:14](https://github.com/SketchingDev/ivr-tester/blob/2e93db6/packages/ivr-tester/src/testing/DefaultTestExecutor.ts#L14)*

___

### transcriberFactory

• `Private` `Readonly` **transcriberFactory**: [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/testing/DefaultTestExecutor.ts:13](https://github.com/SketchingDev/ivr-tester/blob/2e93db6/packages/ivr-tester/src/testing/DefaultTestExecutor.ts#L13)*

## Methods

### startTest

▸ **startTest**(`test`: [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md), `call`: [Call](../interfaces/_call_call_.call.md)): [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md)

*Implementation of [TestExecutor](../interfaces/_testing_defaulttestexecutor_.testexecutor.md)*

*Defined in [packages/ivr-tester/src/testing/DefaultTestExecutor.ts:17](https://github.com/SketchingDev/ivr-tester/blob/2e93db6/packages/ivr-tester/src/testing/DefaultTestExecutor.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`test` | [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md) |
`call` | [Call](../interfaces/_call_call_.call.md) |

**Returns:** [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md)
