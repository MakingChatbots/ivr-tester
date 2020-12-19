**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/ServerConfig"](../modules/_configuration_serverconfig_.md) / ServerConfig

# Interface: ServerConfig

## Hierarchy

* **ServerConfig**

## Index

### Properties

* [dtmfGenerator](_configuration_serverconfig_.serverconfig.md#dtmfgenerator)
* [localServerPort](_configuration_serverconfig_.serverconfig.md#localserverport)
* [pauseAtEndOfTranscript](_configuration_serverconfig_.serverconfig.md#pauseatendoftranscript)
* [recording](_configuration_serverconfig_.serverconfig.md#recording)
* [transcriber](_configuration_serverconfig_.serverconfig.md#transcriber)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/configuration/ServerConfig.ts:7](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/configuration/ServerConfig.ts#L7)*

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/configuration/ServerConfig.ts:26](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/configuration/ServerConfig.ts#L26)*

Port that the server listens on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### pauseAtEndOfTranscript

• `Optional` **pauseAtEndOfTranscript**: number

*Defined in [packages/ivr-tester/src/configuration/ServerConfig.ts:15](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/configuration/ServerConfig.ts#L15)*

How long to wait when receiving parts of a transcript to decide
whether the transcribing has completed

___

### recording

• `Optional` **recording**: { filename?: string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) ; outputPath: string  }

*Defined in [packages/ivr-tester/src/configuration/ServerConfig.ts:17](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/configuration/ServerConfig.ts#L17)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| [FilenameFactory](../modules/_call_recording_filename_filenamefactory_.md#filenamefactory) |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_call_transcription_plugin_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/configuration/ServerConfig.ts:9](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/configuration/ServerConfig.ts#L9)*
