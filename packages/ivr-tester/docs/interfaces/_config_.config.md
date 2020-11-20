**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["Config"](../modules/_config_.md) / Config

# Interface: Config

## Hierarchy

* [ServerConfig](_server_.serverconfig.md)

* [TestRunnerConfig](_testrunner_.testrunnerconfig.md)

  ↳ **Config**

## Index

### Properties

* [dtmfGenerator](_config_.config.md#dtmfgenerator)
* [localServerPort](_config_.config.md#localserverport)
* [plugins](_config_.config.md#plugins)
* [publicServerUrl](_config_.config.md#publicserverurl)
* [recording](_config_.config.md#recording)
* [transcriber](_config_.config.md#transcriber)
* [twilioClient](_config_.config.md#twilioclient)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: [DtmfBufferGenerator](_dtmf_dtmfplayer_.dtmfbuffergenerator.md)

*Inherited from [ServerConfig](_server_.serverconfig.md).[dtmfGenerator](_server_.serverconfig.md#dtmfgenerator)*

*Defined in [packages/ivr-tester/src/server.ts:34](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L34)*

___

### localServerPort

• `Optional` **localServerPort**: number \| undefined

*Inherited from [ServerConfig](_server_.serverconfig.md).[localServerPort](_server_.serverconfig.md#localserverport)*

*Defined in [packages/ivr-tester/src/server.ts:45](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L45)*

Port that server is to listen on.
This value can be overridden by setting the environment variable LOCAL_SERVER_PORT

___

### plugins

• `Optional` **plugins**: [LifecycleHookPlugin](_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)[]

*Inherited from [TestRunnerConfig](_testrunner_.testrunnerconfig.md).[plugins](_testrunner_.testrunnerconfig.md#plugins)*

*Defined in [packages/ivr-tester/src/testRunner.ts:28](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/testRunner.ts#L28)*

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Inherited from [TestRunnerConfig](_testrunner_.testrunnerconfig.md).[publicServerUrl](_testrunner_.testrunnerconfig.md#publicserverurl)*

*Defined in [packages/ivr-tester/src/testRunner.ts:26](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/testRunner.ts#L26)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### recording

• `Optional` **recording**: { filename?: string \| (stream: [StreamDetails](_handlers_mediastreamrecorder_.streamdetails.md)) => string ; outputPath: string  }

*Inherited from [ServerConfig](_server_.serverconfig.md).[recording](_server_.serverconfig.md#recording)*

*Defined in [packages/ivr-tester/src/server.ts:36](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L36)*

#### Type declaration:

Name | Type |
------ | ------ |
`filename?` | string \| (stream: [StreamDetails](_handlers_mediastreamrecorder_.streamdetails.md)) => string |
`outputPath` | string |

___

### transcriber

•  **transcriber**: [TranscriberFactory](../modules/_plugins_transcription_transcriberfactory_.md#transcriberfactory)

*Inherited from [ServerConfig](_server_.serverconfig.md).[transcriber](_server_.serverconfig.md#transcriber)*

*Defined in [packages/ivr-tester/src/server.ts:35](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L35)*

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Inherited from [TestRunnerConfig](_testrunner_.testrunnerconfig.md).[twilioClient](_testrunner_.testrunnerconfig.md#twilioclient)*

*Defined in [packages/ivr-tester/src/testRunner.ts:18](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/testRunner.ts#L18)*

Twilio client used to initiate the call to the IVR
