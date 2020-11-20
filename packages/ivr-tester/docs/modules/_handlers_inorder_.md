**[IVR Tester](../README.md)**

> [Globals](../README.md) / "handlers/inOrder"

# Module: "handlers/inOrder"

## Index

### Functions

* [inOrder](_handlers_inorder_.md#inorder)

## Functions

### inOrder

▸ `Const`**inOrder**(`conditions`: ReadonlyArray\<[TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md)>): object

*Defined in [packages/ivr-tester/src/handlers/inOrder.ts:12](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/ivr-tester/src/handlers/inOrder.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`conditions` | ReadonlyArray\<[TranscriptCondition](../interfaces/_conditions_transcriptcondition_.transcriptcondition.md)> |

**Returns:** object

Name | Type |
------ | ------ |
`test` | (transcript: string, call: Call) => TestResult |
