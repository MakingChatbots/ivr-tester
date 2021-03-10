**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/CallFlowTestDefinition"

# Module: "testing/test/CallFlowTestDefinition"

## Index

### Interfaces

* [AllPromptsMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.allpromptsmatchedevent.md)
* [CallFlowInstructions](../interfaces/_testing_test_callflowtestdefinition_.callflowinstructions.md)
* [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md)
* [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md)
* [SessionProgressEvent](../interfaces/_testing_test_callflowtestdefinition_.sessionprogressevent.md)
* [TimeoutWaitingForMatchEvent](../interfaces/_testing_test_callflowtestdefinition_.timeoutwaitingformatchevent.md)

### Type aliases

* [CallFlowSession](_testing_test_callflowtestdefinition_.md#callflowsession)
* [CallFlowSessionEvents](_testing_test_callflowtestdefinition_.md#callflowsessionevents)

## Type aliases

### CallFlowSession

Ƭ  **CallFlowSession**: [Emitter](../interfaces/_emitter_.emitter.md)\<[CallFlowSessionEvents](_testing_test_callflowtestdefinition_.md#callflowsessionevents)>

*Defined in [packages/ivr-tester/src/testing/test/CallFlowTestDefinition.ts:30](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/testing/test/CallFlowTestDefinition.ts#L30)*

___

### CallFlowSessionEvents

Ƭ  **CallFlowSessionEvents**: { allPromptsMatched: [AllPromptsMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.allpromptsmatchedevent.md) ; progress: [SessionProgressEvent](../interfaces/_testing_test_callflowtestdefinition_.sessionprogressevent.md) ; promptMatched: [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md) ; timeoutWaitingForMatch: [TimeoutWaitingForMatchEvent](../interfaces/_testing_test_callflowtestdefinition_.timeoutwaitingformatchevent.md)  }

*Defined in [packages/ivr-tester/src/testing/test/CallFlowTestDefinition.ts:23](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/testing/test/CallFlowTestDefinition.ts#L23)*

#### Type declaration:

Name | Type |
------ | ------ |
`allPromptsMatched` | [AllPromptsMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.allpromptsmatchedevent.md) |
`progress` | [SessionProgressEvent](../interfaces/_testing_test_callflowtestdefinition_.sessionprogressevent.md) |
`promptMatched` | [PromptMatchedEvent](../interfaces/_testing_test_callflowtestdefinition_.promptmatchedevent.md) |
`timeoutWaitingForMatch` | [TimeoutWaitingForMatchEvent](../interfaces/_testing_test_callflowtestdefinition_.timeoutwaitingformatchevent.md) |
