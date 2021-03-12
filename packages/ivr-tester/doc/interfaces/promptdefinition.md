[IVR Tester](../README.md) / PromptDefinition

# Interface: PromptDefinition

Performs an assertion when a prompt has been transcribed.

## Table of contents

### Properties

- [silenceAfterPrompt](promptdefinition.md#silenceafterprompt)
- [then](promptdefinition.md#then)
- [timeout](promptdefinition.md#timeout)
- [whenPrompt](promptdefinition.md#whenprompt)

## Properties

### silenceAfterPrompt

• `Readonly` **silenceAfterPrompt**: *number*

Milliseconds of silence expected after the prompt has been matched before concluding the prompt has ended.

Defined in: [testing/test/conditions/PromptDefinition.ts:21](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L21)

___

### then

• `Readonly` **then**: [*Then*](then.md)

Action to perform following a successful assertion

Defined in: [testing/test/conditions/PromptDefinition.ts:16](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L16)

___

### timeout

• `Readonly` **timeout**: *number*

Amount of time a prompt should wait for a match before timing out.

Defined in: [testing/test/conditions/PromptDefinition.ts:26](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L26)

___

### whenPrompt

• `Readonly` **whenPrompt**: [*When*](../README.md#when)

Assertion to perform against the transcription of a prompt

Defined in: [testing/test/conditions/PromptDefinition.ts:11](https://github.com/SketchingDev/ivr-tester/blob/a815992/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L11)
