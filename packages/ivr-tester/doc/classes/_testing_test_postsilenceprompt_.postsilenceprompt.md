**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/test/PostSilencePrompt"](../modules/_testing_test_postsilenceprompt_.md) / PostSilencePrompt

# Class: PostSilencePrompt

## Hierarchy

* **PostSilencePrompt**

## Implements

* [Prompt](../interfaces/_testing_test_inorder_.prompt.md)

## Index

### Constructors

* [constructor](_testing_test_postsilenceprompt_.postsilenceprompt.md#constructor)

### Properties

* [call](_testing_test_postsilenceprompt_.postsilenceprompt.md#call)
* [definition](_testing_test_postsilenceprompt_.postsilenceprompt.md#definition)
* [isFirstInvocation](_testing_test_postsilenceprompt_.postsilenceprompt.md#isfirstinvocation)
* [lastKnownTranscript](_testing_test_postsilenceprompt_.postsilenceprompt.md#lastknowntranscript)
* [matchedCallback](_testing_test_postsilenceprompt_.postsilenceprompt.md#matchedcallback)
* [nextPrompt](_testing_test_postsilenceprompt_.postsilenceprompt.md#nextprompt)
* [promptTimedOut](_testing_test_postsilenceprompt_.postsilenceprompt.md#prompttimedout)
* [silenceAfterPromptTimer](_testing_test_postsilenceprompt_.postsilenceprompt.md#silenceafterprompttimer)
* [skipPrompt](_testing_test_postsilenceprompt_.postsilenceprompt.md#skipprompt)
* [timeoutCallback](_testing_test_postsilenceprompt_.postsilenceprompt.md#timeoutcallback)
* [timeoutClear](_testing_test_postsilenceprompt_.postsilenceprompt.md#timeoutclear)
* [timeoutSet](_testing_test_postsilenceprompt_.postsilenceprompt.md#timeoutset)
* [timeoutTimer](_testing_test_postsilenceprompt_.postsilenceprompt.md#timeouttimer)

### Methods

* [clearSilenceAfterPromptTimer](_testing_test_postsilenceprompt_.postsilenceprompt.md#clearsilenceafterprompttimer)
* [clearTimeoutTimer](_testing_test_postsilenceprompt_.postsilenceprompt.md#cleartimeouttimer)
* [processUpdatedTranscript](_testing_test_postsilenceprompt_.postsilenceprompt.md#processupdatedtranscript)
* [setNext](_testing_test_postsilenceprompt_.postsilenceprompt.md#setnext)
* [startTimeoutTimer](_testing_test_postsilenceprompt_.postsilenceprompt.md#starttimeouttimer)
* [transcriptUpdated](_testing_test_postsilenceprompt_.postsilenceprompt.md#transcriptupdated)

## Constructors

### constructor

\+ **new PostSilencePrompt**(`definition`: [PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md), `call`: [Call](../interfaces/_call_call_.call.md), `matchedCallback`: [MatchedCallback](../modules/_testing_test_inorder_.md#matchedcallback), `timeoutCallback`: [TimeoutCallback](../modules/_testing_test_inorder_.md#timeoutcallback), `timeoutSet`: *typeof* setTimeout, `timeoutClear`: *typeof* clearTimeout): [PostSilencePrompt](_testing_test_postsilenceprompt_.postsilenceprompt.md)

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:15](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`definition` | [PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md) |
`call` | [Call](../interfaces/_call_call_.call.md) |
`matchedCallback` | [MatchedCallback](../modules/_testing_test_inorder_.md#matchedcallback) |
`timeoutCallback` | [TimeoutCallback](../modules/_testing_test_inorder_.md#timeoutcallback) |
`timeoutSet` | *typeof* setTimeout |
`timeoutClear` | *typeof* clearTimeout |

**Returns:** [PostSilencePrompt](_testing_test_postsilenceprompt_.postsilenceprompt.md)

## Properties

### call

• `Private` `Readonly` **call**: [Call](../interfaces/_call_call_.call.md)

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:19](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L19)*

___

### definition

• `Readonly` **definition**: [PromptDefinition](../interfaces/_testing_test_conditions_promptdefinition_.promptdefinition.md)

*Implementation of [Prompt](../interfaces/_testing_test_inorder_.prompt.md).[definition](../interfaces/_testing_test_inorder_.prompt.md#definition)*

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:18](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L18)*

___

### isFirstInvocation

• `Private` **isFirstInvocation**: boolean = true

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:10](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L10)*

___

### lastKnownTranscript

• `Private` **lastKnownTranscript**: string = ""

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:11](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L11)*

___

### matchedCallback

• `Private` `Readonly` **matchedCallback**: [MatchedCallback](../modules/_testing_test_inorder_.md#matchedcallback)

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:20](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L20)*

___

### nextPrompt

• `Private` **nextPrompt**: [Prompt](../interfaces/_testing_test_inorder_.prompt.md)

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:15](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L15)*

___

### promptTimedOut

• `Private` **promptTimedOut**: boolean = false

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:9](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L9)*

___

### silenceAfterPromptTimer

• `Private` **silenceAfterPromptTimer**: ReturnType\<*typeof* setTimeout>

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:13](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L13)*

___

### skipPrompt

• `Private` **skipPrompt**: boolean = false

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:14](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L14)*

___

### timeoutCallback

• `Private` `Readonly` **timeoutCallback**: [TimeoutCallback](../modules/_testing_test_inorder_.md#timeoutcallback)

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:21](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L21)*

___

### timeoutClear

• `Private` `Readonly` **timeoutClear**: *typeof* clearTimeout

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:23](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L23)*

___

### timeoutSet

• `Private` `Readonly` **timeoutSet**: *typeof* setTimeout

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:22](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L22)*

___

### timeoutTimer

• `Private` **timeoutTimer**: ReturnType\<*typeof* setTimeout>

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:8](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L8)*

## Methods

### clearSilenceAfterPromptTimer

▸ `Private`**clearSilenceAfterPromptTimer**(): void

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:76](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L76)*

**Returns:** void

___

### clearTimeoutTimer

▸ `Private`**clearTimeoutTimer**(): void

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:90](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L90)*

**Returns:** void

___

### processUpdatedTranscript

▸ `Private`**processUpdatedTranscript**(`transcriptEvent`: [PromptTranscriptionBuilder](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md)): void

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:50](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L50)*

#### Parameters:

Name | Type |
------ | ------ |
`transcriptEvent` | [PromptTranscriptionBuilder](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md) |

**Returns:** void

___

### setNext

▸ **setNext**(`prompt`: [Prompt](../interfaces/_testing_test_inorder_.prompt.md)): [Prompt](../interfaces/_testing_test_inorder_.prompt.md)

*Implementation of [Prompt](../interfaces/_testing_test_inorder_.prompt.md)*

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:26](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`prompt` | [Prompt](../interfaces/_testing_test_inorder_.prompt.md) |

**Returns:** [Prompt](../interfaces/_testing_test_inorder_.prompt.md)

___

### startTimeoutTimer

▸ `Private`**startTimeoutTimer**(): void

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:83](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L83)*

**Returns:** void

___

### transcriptUpdated

▸ **transcriptUpdated**(`transcriptEvent`: [PromptTranscriptionBuilder](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md)): void

*Implementation of [Prompt](../interfaces/_testing_test_inorder_.prompt.md)*

*Defined in [packages/ivr-tester/src/testing/test/PostSilencePrompt.ts:31](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/testing/test/PostSilencePrompt.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`transcriptEvent` | [PromptTranscriptionBuilder](_call_transcription_prompttranscriptionbuilder_.prompttranscriptionbuilder.md) |

**Returns:** void
