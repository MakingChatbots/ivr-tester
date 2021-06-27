[IVR Tester](../README.md) / TranscriberFactory

# Interface: TranscriberFactory

Factory to create a instance of a transcriber per test

## Table of contents

### Properties

- [checkCanRun](transcriberfactory.md#checkcanrun)
- [create](transcriberfactory.md#create)

## Properties

### checkCanRun

• **checkCanRun**: () => [*CanRunCheck*](../README.md#canruncheck) \| *Promise*<[*CanRunCheck*](../README.md#canruncheck)\>

Called on startup to check that the transcriber has
everything it needs to work properly when a call is connected
e.g. credentials

#### Type declaration:

▸ (): [*CanRunCheck*](../README.md#canruncheck) \| *Promise*<[*CanRunCheck*](../README.md#canruncheck)\>

**Returns:** [*CanRunCheck*](../README.md#canruncheck) \| *Promise*<[*CanRunCheck*](../README.md#canruncheck)\>

Defined in: [call/transcription/plugin/TranscriberFactory.ts:23](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L23)

Defined in: [call/transcription/plugin/TranscriberFactory.ts:23](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L23)

___

### create

• **create**: () => [*TranscriberPlugin*](transcriberplugin.md)

Creates the transcriber. This will be called once per call.

#### Type declaration:

▸ (): [*TranscriberPlugin*](transcriberplugin.md)

**Returns:** [*TranscriberPlugin*](transcriberplugin.md)

Defined in: [call/transcription/plugin/TranscriberFactory.ts:28](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L28)

Defined in: [call/transcription/plugin/TranscriberFactory.ts:28](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L28)
