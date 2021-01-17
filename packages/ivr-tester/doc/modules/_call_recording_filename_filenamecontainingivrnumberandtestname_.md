**[IVR Tester](../README.md)**

> [Globals](../README.md) / "call/recording/filename/filenameContainingIvrNumberAndTestName"

# Module: "call/recording/filename/filenameContainingIvrNumberAndTestName"

## Index

### Functions

* [filenameContainingIvrNumberAndTestName](_call_recording_filename_filenamecontainingivrnumberandtestname_.md#filenamecontainingivrnumberandtestname)

## Functions

### filenameContainingIvrNumberAndTestName

▸ `Const`**filenameContainingIvrNumberAndTestName**(`__namedParameters`: { call: { from: string ; to: string  }  }, `test`: IvrTest): string

*Defined in [packages/ivr-tester/src/call/recording/filename/filenameContainingIvrNumberAndTestName.ts:9](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/recording/filename/filenameContainingIvrNumberAndTestName.ts#L9)*

Produces filename that looks like '<phone-number>-<datetime>-<test-name>.wav'

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { call: { from: string ; to: string  }  } |
`test` | IvrTest |

**Returns:** string
