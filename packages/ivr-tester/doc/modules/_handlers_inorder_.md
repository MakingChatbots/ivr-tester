**[IVR Tester](../README.md)**

> [Globals](../README.md) / "handlers/inOrder"

# Module: "handlers/inOrder"

## Index

### Functions

* [inOrder](_handlers_inorder_.md#inorder)

## Functions

### inOrder

▸ `Const`**inOrder**(`conditions`: ReadonlyArray\<[AssertThen](../interfaces/_testing_conditions_assertthen_.assertthen.md)>): object

*Defined in [packages/ivr-tester/src/handlers/inOrder.ts:9](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/handlers/inOrder.ts#L9)*

Executes [AssertThen](../interfaces/_testing_conditions_assertthen_.assertthen.md)'s in order

#### Parameters:

Name | Type |
------ | ------ |
`conditions` | ReadonlyArray\<[AssertThen](../interfaces/_testing_conditions_assertthen_.assertthen.md)> |

**Returns:** object

Name | Type |
------ | ------ |
`test` | (transcript: string, call: [Call](../interfaces/_call_call_.call.md)) => TestResult |
