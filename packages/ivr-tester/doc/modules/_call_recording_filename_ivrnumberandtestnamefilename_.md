**[IVR Tester](../README.md)**

> [Globals](../README.md) / "call/recording/filename/ivrNumberAndTestNameFilename"

# Module: "call/recording/filename/ivrNumberAndTestNameFilename"

## Index

### Functions

* [ivrNumberAndTestNameFilename](_call_recording_filename_ivrnumberandtestnamefilename_.md#ivrnumberandtestnamefilename)

## Functions

### ivrNumberAndTestNameFilename

▸ `Const`**ivrNumberAndTestNameFilename**(`__namedParameters`: { call: { from: string ; to: string  }  }, `test`: [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md), `suffix?`: string): string

*Defined in [packages/ivr-tester/src/call/recording/filename/ivrNumberAndTestNameFilename.ts:8](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/recording/filename/ivrNumberAndTestNameFilename.ts#L8)*

Produces filename that looks like '<phone-number>-<datetime>-<test-name>-<optional-suffix>'

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { call: { from: string ; to: string  }  } |
`test` | [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md) |
`suffix?` | string |

**Returns:** string
