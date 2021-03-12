**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/transcription/plugin/TranscriberFactory"](../modules/_call_transcription_plugin_transcriberfactory_.md) / TranscriberFactory

# Interface: TranscriberFactory

Factory to create a instance of a transcriber per test

## Hierarchy

* **TranscriberFactory**

## Index

### Properties

* [checkCanRun](_call_transcription_plugin_transcriberfactory_.transcriberfactory.md#checkcanrun)
* [create](_call_transcription_plugin_transcriberfactory_.transcriberfactory.md#create)

## Properties

### checkCanRun

•  **checkCanRun**: () => Promise\<[CanRunCheck](../modules/_call_transcription_plugin_transcriberfactory_.md#canruncheck)> \| [CanRunCheck](../modules/_call_transcription_plugin_transcriberfactory_.md#canruncheck)

*Defined in [packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts:23](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L23)*

Called on startup to check that the transcriber has
everything it needs to work properly when a call is connected
e.g. credentials

___

### create

•  **create**: () => [TranscriberPlugin](_call_transcription_plugin_transcriberplugin_.transcriberplugin.md)

*Defined in [packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts:28](https://github.com/SketchingDev/ivr-tester/blob/e17074e/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L28)*

Creates the transcriber. This will be called once per call.
