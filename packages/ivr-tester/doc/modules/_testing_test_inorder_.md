**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/inOrder"

# Module: "testing/test/inOrder"

## Index

### Interfaces

* [Prompt](../interfaces/_testing_test_inorder_.prompt.md)

### Type aliases

* [MatchedCallback](_testing_test_inorder_.md#matchedcallback)
* [PromptFactory](_testing_test_inorder_.md#promptfactory)
* [TimeoutCallback](_testing_test_inorder_.md#timeoutcallback)

### Functions

* [inOrder](_testing_test_inorder_.md#inorder)

## Type aliases

### MatchedCallback

Ƭ  **MatchedCallback**: (prompt: [Prompt](../interfaces/_testing_test_inorder_.prompt.md), transcriptMatched: string) => void

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:24](https://github.com/SketchingDev/ivr-tester/blob/e4629d5/packages/ivr-tester/src/testing/test/inOrder.ts#L24)*

___

### PromptFactory

Ƭ  **PromptFactory**: (definition: [PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md), call: [Call](../interfaces/_call_call_.call.md), matchedCallback: [MatchedCallback](_testing_test_inorder_.md#matchedcallback), timeoutCallback: [TimeoutCallback](_testing_test_inorder_.md#timeoutcallback)) => [Prompt](../interfaces/_testing_test_inorder_.prompt.md) \| undefined

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:31](https://github.com/SketchingDev/ivr-tester/blob/e4629d5/packages/ivr-tester/src/testing/test/inOrder.ts#L31)*

___

### TimeoutCallback

Ƭ  **TimeoutCallback**: (prompt: [Prompt](../interfaces/_testing_test_inorder_.prompt.md), transcript: string) => void

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:29](https://github.com/SketchingDev/ivr-tester/blob/e4629d5/packages/ivr-tester/src/testing/test/inOrder.ts#L29)*

## Functions

### inOrder

▸ **inOrder**(`promptDefinitions`: ReadonlyArray\<[PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md)>, `promptFactory?`: [PromptFactory](_testing_test_inorder_.md#promptfactory)): [CallFlowInstructions](../interfaces/_testing_test_callflowtestdefinition_.callflowinstructions.md)

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:129](https://github.com/SketchingDev/ivr-tester/blob/e4629d5/packages/ivr-tester/src/testing/test/inOrder.ts#L129)*

Creates an ordered prompt collection

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`promptDefinitions` | ReadonlyArray\<[PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md)> | - |
`promptFactory` | [PromptFactory](_testing_test_inorder_.md#promptfactory) | defaultPromptFactory |

**Returns:** [CallFlowInstructions](../interfaces/_testing_test_callflowtestdefinition_.callflowinstructions.md)
