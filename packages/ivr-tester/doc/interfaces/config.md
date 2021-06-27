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
- [twilioAuth](config.md#twilioauth)
- [twilioClientFactory](config.md#twilioclientfactory)

## Properties

### dtmfGenerator

• `Optional` **dtmfGenerator**: DtmfBufferGenerator

DTMF tone generator

Defined in: [configuration/Config.ts:10](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L10)

___

### localServerPort

• `Optional` **localServerPort**: *number*

Port that the server listens on. Defaults to 8080

Defined in: [configuration/Config.ts:41](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L41)

___

### msTimeoutWaitingForCall

• `Optional` **msTimeoutWaitingForCall**: *number*

How long to wait for any of the calls to be established (in milliseconds) before timing out.

Defined in: [configuration/Config.ts:70](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L70)

___

### publicServerUrl

• `Optional` **publicServerUrl**: *string*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

Defined in: [configuration/Config.ts:65](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L65)

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

Defined in: [configuration/Config.ts:17](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L17)

___

### transcriber

• **transcriber**: [*TranscriberFactory*](transcriberfactory.md)

Factory to create a instance of a transcriber per test

Defined in: [configuration/Config.ts:15](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L15)

___

### twilioAuth

• **twilioAuth**: TwilioClientAuth

Authentication details for Twilio account. This is passed to the factory.

**`see`** twilioClientFactory

Defined in: [configuration/Config.ts:47](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L47)

___

### twilioClientFactory

• `Optional` **twilioClientFactory**: TwilioClientFactory

Factory for creating the Twilio client used to initiate the call to the IVR.
The factory is passed the authentication details from the configuration.

You're unlikely to need to set this unless you want to test or intercept IVR Tester's interaction
with Twilio

**`see`** twilioAuth

Defined in: [configuration/Config.ts:57](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/configuration/Config.ts#L57)
