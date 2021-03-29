[IVR Tester](../README.md) / Config

# Interface: Config

## Table of contents

### Properties

- [dtmfGenerator](config.md#dtmfgenerator)
- [localServerPort](config.md#localserverport)
- [msTimeoutWaitingForCall](config.md#mstimeoutwaitingforcall)
- [publicServerUrl](config.md#publicserverurl)
- [recording](config.md#recording)
- [transcriber](config.md#transcriber)
- [twilioClient](config.md#twilioclient)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: DtmfBufferGenerator

DTMF tone generator

Defined in: [configuration/Config.ts:10](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L10)

___

### localServerPort

• `Optional` **localServerPort**: *number*

Port that the server listens on. Defaults to 8080

Defined in: [configuration/Config.ts:41](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L41)

___

### msTimeoutWaitingForCall

• `Optional` **msTimeoutWaitingForCall**: *number*

How long to wait for any of the calls to be established (in milliseconds) before timing out.

Defined in: [configuration/Config.ts:59](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L59)

___

### publicServerUrl

• `Optional` **publicServerUrl**: *string*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

Defined in: [configuration/Config.ts:54](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L54)

___

### recording

• `Optional` **recording**: *object*

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`audio`? | *object* | Configuration for recording the call's audio   |
`audio.filename`? | *string* \| FilenameFactory | - |
`audio.outputPath` | *string* | - |
`transcript`? | *object* | Configuration for recording the call's transcription   |
`transcript.filename`? | *string* \| FilenameFactory | - |
`transcript.includeResponse`? | *boolean* | Includes what you responded with to the prompt   |
`transcript.outputPath` | *string* | - |

Defined in: [configuration/Config.ts:17](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L17)

___

### transcriber

• **transcriber**: [*TranscriberFactory*](transcriberfactory.md)

Factory to create a instance of a transcriber per test

Defined in: [configuration/Config.ts:15](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L15)

___

### twilioClient

• `Optional` **twilioClient**: *Twilio*

Twilio client used to initiate the call to the IVR

Defined in: [configuration/Config.ts:46](https://github.com/SketchingDev/ivr-tester/blob/a21dd89/packages/ivr-tester/src/configuration/Config.ts#L46)
