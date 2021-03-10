**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/test/inOrder"](../modules/_testing_test_inorder_.md) / Prompt

# Interface: Prompt

## Hierarchy

* **Prompt**

## Implemented by

* [PostSilencePrompt](../classes/_testing_test_postsilenceprompt_.postsilenceprompt.md)

## Index

### Properties

* [definition](_testing_test_inorder_.prompt.md#definition)

### Methods

* [setNext](_testing_test_inorder_.prompt.md#setnext)
* [transcriptUpdated](_testing_test_inorder_.prompt.md#transcriptupdated)

## Properties

### definition

• `Readonly` **definition**: [PromptDefinition](_testing_test_conditions_promptdefinition_.promptdefinition.md)

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:18](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/testing/test/inOrder.ts#L18)*

## Methods

### setNext

▸ **setNext**(`prompt`: [Prompt](_testing_test_inorder_.prompt.md)): [Prompt](_testing_test_inorder_.prompt.md)

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:19](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/testing/test/inOrder.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`prompt` | [Prompt](_testing_test_inorder_.prompt.md) |

**Returns:** [Prompt](_testing_test_inorder_.prompt.md)

___

### transcriptUpdated

▸ **transcriptUpdated**(`transcriptEvent`: [PromptTranscriptionBuilder](../classes/_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md)): void

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:21](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/testing/test/inOrder.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`transcriptEvent` | [PromptTranscriptionBuilder](../classes/_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md) |

**Returns:** void
