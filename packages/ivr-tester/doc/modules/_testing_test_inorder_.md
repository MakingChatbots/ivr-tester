**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/test/inOrder"

# Module: "testing/test/inOrder"

## Index

### Functions

* [inOrder](_testing_test_inorder_.md#inorder)

## Functions

### inOrder

▸ `Const`**inOrder**(`conditions`: ReadonlyArray\<[AssertThen](../interfaces/_testing_test_conditions_assertthen_.assertthen.md)>): object

*Defined in [packages/ivr-tester/src/testing/test/inOrder.ts:10](https://github.com/SketchingDev/ivr-tester/blob/16cd721/packages/ivr-tester/src/testing/test/inOrder.ts#L10)*

Executes [AssertThen](../interfaces/_testing_test_conditions_assertthen_.assertthen.md)'s in order

#### Parameters:

Name | Type |
------ | ------ |
`conditions` | ReadonlyArray\<[AssertThen](../interfaces/_testing_test_conditions_assertthen_.assertthen.md)> |

**Returns:** object

Name | Type |
------ | ------ |
`test` | (transcript: string, call: [Call](../interfaces/_call_call_.call.md)) => [TestResult](../interfaces/_testing_test_testinstanceclass_.testresult.md) |
