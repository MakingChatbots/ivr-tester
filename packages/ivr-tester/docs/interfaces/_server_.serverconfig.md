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

• `Optional` **dtmfGenerator**: DtmfBufferGenerator

*Defined in [packages/ivr-tester/src/server.ts:35](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/ivr-tester/src/server.ts#L35)*

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Defined in [packages/ivr-tester/src/server.ts:46](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/ivr-tester/src/server.ts#L46)*

Port that server is to listen on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### recording

• `Optional` **recording**: { filename?: string \| (stream: StreamDetails) => string ; outputPath: string  }

*Defined in [packages/ivr-tester/src/server.ts:37](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/ivr-tester/src/server.ts#L37)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| (stream: StreamDetails) => string |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_plugins_transcription_transcriberfactory_.md#transcriberfactory)

*Defined in [packages/ivr-tester/src/server.ts:36](https://github.com/SketchingDev/ivr-tester/blob/e6cabf9/packages/ivr-tester/src/server.ts#L36)*
