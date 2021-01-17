**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/Config"](../modules/_configuration_config_.md) / Config

# Interface: Config

## Hierarchy

* **Config**

## Index

### Properties

* [dtmfGenerator](_configuration_config_.config.md#dtmfgenerator)
* [localServerPort](_configuration_config_.config.md#localserverport)
* [msPauseAtEndOfTranscript](_configuration_config_.config.md#mspauseatendoftranscript)
* [plugins](_configuration_config_.config.md#plugins)
* [publicServerUrl](_configuration_config_.config.md#publicserverurl)
* [recording](_configuration_config_.config.md#recording)
* [transcriber](_configuration_config_.config.md#transcriber)
* [twilioClient](_configuration_config_.config.md#twilioclient)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:11](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L11)*

DTMF tone generator

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:34](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L34)*

Port that the server listens on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### msPauseAtEndOfTranscript

• `Optional` **msPauseAtEndOfTranscript**: number

*Defined in [packages/ivr-tester/src/configuration/Config.ts:23](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L23)*

How long to wait when receiving parts of a transcript to decide
whether the transcribing has completed.
Defaults to 2 seconds

___

### plugins

• `Optional` **plugins**: [LifecycleHookPlugin](_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)[]

*Defined in [packages/ivr-tester/src/configuration/Config.ts:52](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L52)*

Plugins that can hook into the lifecycle of a test

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:47](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L47)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### recording

• `Optional` **recording**: { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; outputPath: string  }

*Defined in [packages/ivr-tester/src/configuration/Config.ts:25](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L25)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:16](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L16)*

Factory to create a instance of a transcriber per test

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/configuration/Config.ts:39](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/configuration/Config.ts#L39)*

Twilio client used to initiate the call to the IVR
