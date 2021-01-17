**[IVR Tester](../README.md)**

> [Globals](../README.md) / "plugins/lifecycle/TestEvents"

# Module: "plugins/lifecycle/TestEvents"

## Index

### Interfaces

* [CallAssignedTestEvent](../interfaces/_plugins_lifecycle_testevents_.callassignedtestevent.md)
* [IvrTestConditionMetEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestconditionmetevent.md)
* [IvrTestFailed](../interfaces/_plugins_lifecycle_testevents_.ivrtestfailed.md)
* [IvrTestSuccessEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestsuccessevent.md)
* [IvrTranscription](../interfaces/_plugins_lifecycle_testevents_.ivrtranscription.md)

### Type aliases

* [TestEvents](_plugins_lifecycle_testevents_.md#testevents)

## Type aliases

### TestEvents

Ƭ  **TestEvents**: { callAssignedTest: [CallAssignedTestEvent](../interfaces/_plugins_lifecycle_testevents_.callassignedtestevent.md) ; callConnected: undefined ; ivrTestConditionMet: [IvrTestConditionMetEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestconditionmetevent.md) ; ivrTestFailed: [IvrTestFailed](../interfaces/_plugins_lifecycle_testevents_.ivrtestfailed.md) ; ivrTestPassed: [IvrTestSuccessEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestsuccessevent.md) ; ivrTranscription: [IvrTranscription](../interfaces/_plugins_lifecycle_testevents_.ivrtranscription.md)  }

*Defined in [packages/ivr-tester/src/plugins/lifecycle/TestEvents.ts:33](https://github.com/SketchingDev/ivr-tester/blob/44e6705/packages/ivr-tester/src/plugins/lifecycle/TestEvents.ts#L33)*

Lifecycle events during testing

#### Type declaration:

Name | Type |
------ | ------ |
`callAssignedTest` | [CallAssignedTestEvent](../interfaces/_plugins_lifecycle_testevents_.callassignedtestevent.md) |
`callConnected` | undefined |
`ivrTestConditionMet` | [IvrTestConditionMetEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestconditionmetevent.md) |
`ivrTestFailed` | [IvrTestFailed](../interfaces/_plugins_lifecycle_testevents_.ivrtestfailed.md) |
`ivrTestPassed` | [IvrTestSuccessEvent](../interfaces/_plugins_lifecycle_testevents_.ivrtestsuccessevent.md) |
`ivrTranscription` | [IvrTranscription](../interfaces/_plugins_lifecycle_testevents_.ivrtranscription.md) |
