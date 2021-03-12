**[IVR Tester](../README.md)**

> [Globals](../README.md) / "call/recording/filename/FilenameFactory"

# Module: "call/recording/filename/FilenameFactory"

## Index

### Interfaces

* [StreamDetails](../interfaces/_call_recording_filename_filenamefactory_.streamdetails.md)

### Type aliases

* [FilenameFactory](_call_recording_filename_filenamefactory_.md#filenamefactory)

## Type aliases

### FilenameFactory

Ƭ  **FilenameFactory**: (stream: [StreamDetails](../interfaces/_call_recording_filename_filenamefactory_.streamdetails.md), callFlowTestDefinition: [CallFlowTestDefinition](../interfaces/_testing_test_callflowtestdefinition_.callflowtestdefinition.md), customSuffix?: string) => string

*Defined in [packages/ivr-tester/src/call/recording/filename/FilenameFactory.ts:12](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/recording/filename/FilenameFactory.ts#L12)*

Returns the filename used for recording a stream. The filename returned does not
need to contain the path nor extension.
