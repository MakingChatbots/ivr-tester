**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/Config"](../modules/_configuration_config_.md) / Config

# Interface: Config

## Hierarchy

* **Config**

## Index

### Properties

* [completeTranscriptionTimeoutInMs](_configuration_config_.config.md#completetranscriptiontimeoutinms)
* [dtmfGenerator](_configuration_config_.config.md#dtmfgenerator)
* [localServerPort](_configuration_config_.config.md#localserverport)
* [msTimeoutWaitingForCall](_configuration_config_.config.md#mstimeoutwaitingforcall)
* [publicServerUrl](_configuration_config_.config.md#publicserverurl)
* [recording](_configuration_config_.config.md#recording)
* [transcriber](_configuration_config_.config.md#transcriber)
* [twilioClient](_configuration_config_.config.md#twilioclient)

## Properties

### completeTranscriptionTimeoutInMs

• `Optional` **completeTranscriptionTimeoutInMs**: number

*Defined in [packages/ivr-tester/src/configuration/Config.ts:24](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L24)*

The amount of time to wait, in milliseconds, after the last
transcription event before marking the transcription of the
IVR's prompt as complete.

Default is 5 seconds

___

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:10](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L10)*

DTMF tone generator

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:35](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L35)*

Port that the server listens on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### msTimeoutWaitingForCall

• `Optional` **msTimeoutWaitingForCall**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:50](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L50)*

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:48](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L48)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### recording

• `Optional` **recording**: { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; outputPath: string  }

*Defined in [packages/ivr-tester/src/configuration/Config.ts:26](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L26)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:15](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L15)*

Factory to create a instance of a transcriber per test

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/configuration/Config.ts:40](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/Config.ts#L40)*

Twilio client used to initiate the call to the IVR
