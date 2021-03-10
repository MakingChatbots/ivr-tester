**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/Config"](../modules/_configuration_config_.md) / Config

# Interface: Config

## Hierarchy

* **Config**

## Index

### Properties

* [dtmfGenerator](_configuration_config_.config.md#dtmfgenerator)
* [localServerPort](_configuration_config_.config.md#localserverport)
* [msTimeoutWaitingForCall](_configuration_config_.config.md#mstimeoutwaitingforcall)
* [publicServerUrl](_configuration_config_.config.md#publicserverurl)
* [recording](_configuration_config_.config.md#recording)
* [transcriber](_configuration_config_.config.md#transcriber)
* [twilioClient](_configuration_config_.config.md#twilioclient)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:10](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L10)*

DTMF tone generator

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:36](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L36)*

Port that the server listens on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### msTimeoutWaitingForCall

• `Optional` **msTimeoutWaitingForCall**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:51](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L51)*

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Defined in [packages/ivr-tester/src/configuration/Config.ts:49](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L49)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### recording

• `Optional` **recording**: { audio?: { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; outputPath: string  } ; transcript?: { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; includeResponse?: boolean ; outputPath: string  }  }

*Defined in [packages/ivr-tester/src/configuration/Config.ts:17](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L17)*

#### Type declaration:

Name | Type |
------ | ------ |
`audio?` | { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; outputPath: string  } |
`transcript?` | { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; includeResponse?: boolean ; outputPath: string  } |

___

### transcriber

•  **transcriber**: [TranscriberFactory](_call_transcription_plugin_transcriberfactory_.transcriberfactory.md)

*Defined in [packages/ivr-tester/src/configuration/Config.ts:15](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L15)*

Factory to create a instance of a transcriber per test

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/configuration/Config.ts:41](https://github.com/SketchingDev/ivr-tester/blob/aa015fb/packages/ivr-tester/src/configuration/Config.ts#L41)*

Twilio client used to initiate the call to the IVR
