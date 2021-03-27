[IVR Tester](../README.md) / TestRunnerConfig

# Interface: TestRunnerConfig

## Table of contents

### Properties

- [plugins](testrunnerconfig.md#plugins)
- [publicServerUrl](testrunnerconfig.md#publicserverurl)
- [twilioClient](testrunnerconfig.md#twilioclient)

## Properties

### plugins

• `Optional` **plugins**: [*IvrTesterPlugin*](ivrtesterplugin.md)[]

Defined in: [configuration/TestRunnerConfig.ts:18](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L18)

___

### publicServerUrl

• `Optional` **publicServerUrl**: *string*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

Defined in: [configuration/TestRunnerConfig.ts:16](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L16)

___

### twilioClient

• `Optional` **twilioClient**: *Twilio*

Twilio client used to initiate the call to the IVR

Defined in: [configuration/TestRunnerConfig.ts:8](https://github.com/SketchingDev/ivr-tester/blob/5f8f2c2/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L8)
