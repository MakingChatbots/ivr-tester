**[IVR Tester](../README.md)**

> [Globals](../README.md) / "handlers/inOrder"

# Module: "handlers/inOrder"

## Index

### Interfaces

* [Call](../interfaces/_handlers_inorder_.call.md)

### Functions

* [inOrder](_handlers_inorder_.md#inorder)

## Functions

### inOrder

▸ `Const`**inOrder**(`conditions`: ReadonlyArray\<[TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md)>): object

*Defined in [packages/ivr-tester/src/handlers/inOrder.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f08915c/packages/ivr-tester/src/handlers/inOrder.ts#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`conditions` | ReadonlyArray\<[TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md)> |

**Returns:** object

Name | Type |
------ | ------ |
`test` | (transcript: string, call: [Call](../interfaces/_handlers_inorder_.call.md)) => [TestResult](../interfaces/_handlers_testhandler_.testresult.md) |
