**[IVR Tester](../README.md)**

> [Globals](../README.md) / "call/recording/filename/filenameContainingIvrNumberAndTestName"

# Module: "call/recording/filename/filenameContainingIvrNumberAndTestName"

## Index

### Functions

* [filenameContainingIvrNumberAndTestName](_call_recording_filename_filenamecontainingivrnumberandtestname_.md#filenamecontainingivrnumberandtestname)

## Functions

### filenameContainingIvrNumberAndTestName

▸ `Const`**filenameContainingIvrNumberAndTestName**(`__namedParameters`: { call: { from: string ; to: string  }  }, `test`: [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md)): string

*Defined in [packages/ivr-tester/src/call/recording/filename/filenameContainingIvrNumberAndTestName.ts:9](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/call/recording/filename/filenameContainingIvrNumberAndTestName.ts#L9)*

Produces filename that looks like '<phone-number>-<datetime>-<test-name>.wav'

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { call: { from: string ; to: string  }  } |
`test` | [IvrTest](../interfaces/_testing_test_ivrtest_.ivrtest.md) |

**Returns:** string
