**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/test/conditions/PromptDefinition"](../modules/_testing_test_conditions_promptdefinition_.md) / PromptDefinition

# Interface: PromptDefinition

Performs an assertion when a prompt has been transcribed.

## Hierarchy

* **PromptDefinition**

## Index

### Properties

* [silenceAfterPrompt](_testing_test_conditions_promptdefinition_.promptdefinition.md#silenceafterprompt)
* [then](_testing_test_conditions_promptdefinition_.promptdefinition.md#then)
* [timeout](_testing_test_conditions_promptdefinition_.promptdefinition.md#timeout)
* [whenPrompt](_testing_test_conditions_promptdefinition_.promptdefinition.md#whenprompt)

## Properties

### silenceAfterPrompt

• `Readonly` **silenceAfterPrompt**: number

*Defined in [packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts:21](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L21)*

Milliseconds of silence expected after the prompt has been matched before concluding the prompt has ended.

___

### then

• `Readonly` **then**: [Then](_testing_test_conditions_then_then_.then.md)

*Defined in [packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts:16](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L16)*

Action to perform following a successful assertion

___

### timeout

• `Readonly` **timeout**: number

*Defined in [packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts:26](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L26)*

Amount of time a prompt should wait for a match before timing out.

___

### whenPrompt

• `Readonly` **whenPrompt**: [When](../modules/_testing_test_conditions_when_when_.md#when)

*Defined in [packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts:11](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/testing/test/conditions/PromptDefinition.ts#L11)*

Assertion to perform against the transcription of a prompt
