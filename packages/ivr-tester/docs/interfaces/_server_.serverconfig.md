**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["server"](../modules/_server_.md) / ServerConfig

# Interface: ServerConfig

## Hierarchy

* **ServerConfig**

  ↳ [Config](_config_.config.md)

## Index

### Properties

* [dtmfGenerator](_server_.serverconfig.md#dtmfgenerator)
* [localServerPort](_server_.serverconfig.md#localserverport)
* [recording](_server_.serverconfig.md#recording)
* [transcriber](_server_.serverconfig.md#transcriber)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_dtmf_dtmfplayer_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/server.ts:34](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/server.ts#L34)*

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/server.ts:45](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/server.ts#L45)*

Port that server is to listen on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### recording

• `Optional` **recording**: { filename?: string \| (stream: [StreamDetails](_handlers_mediastreamrecorder_.streamdetails.md)) => string ; outputPath: string  }

*Defined in [packages/ivr-tester/src/server.ts:36](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/server.ts#L36)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| (stream: [StreamDetails](_handlers_mediastreamrecorder_.streamdetails.md)) => string |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_plugins_transcription_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/server.ts:35](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/server.ts#L35)*
