[IVR Tester](../README.md) / Step

# Interface: Step

Performs an assertion when a prompt has been transcribed.

## Table of contents

### Properties

- [silenceAfterPrompt](step.md#silenceafterprompt)
- [then](step.md#then)
- [timeout](step.md#timeout)
- [whenPrompt](step.md#whenprompt)

## Properties

### silenceAfterPrompt

• `Readonly` **silenceAfterPrompt**: *number*

Milliseconds of silence expected after the prompt has been matched before concluding the prompt has ended.

Defined in: [configuration/scenario/Step.ts:21](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/scenario/Step.ts#L21)

___

### then

• `Readonly` **then**: [*Then*](then.md)

Action to perform following a successful assertion

Defined in: [configuration/scenario/Step.ts:16](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/scenario/Step.ts#L16)

___

### timeout

• `Readonly` **timeout**: *number*

Amount of time a prompt should wait for a match before timing out.

Defined in: [configuration/scenario/Step.ts:26](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/scenario/Step.ts#L26)

___

### whenPrompt

• `Readonly` **whenPrompt**: [*When*](../README.md#when)

Assertion to perform against the transcription of a prompt

Defined in: [configuration/scenario/Step.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/scenario/Step.ts#L11)
