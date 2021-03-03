**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/TestRunnerConfig"](../modules/_configuration_testrunnerconfig_.md) / TestRunnerConfig

# Interface: TestRunnerConfig

## Hierarchy

* **TestRunnerConfig**

## Index

### Properties

* [plugins](_configuration_testrunnerconfig_.testrunnerconfig.md#plugins)
* [publicServerUrl](_configuration_testrunnerconfig_.testrunnerconfig.md#publicserverurl)
* [twilioClient](_configuration_testrunnerconfig_.testrunnerconfig.md#twilioclient)

## Properties

### plugins

• `Optional` **plugins**: [IvrTesterPlugin](_plugins_ivrtesterplugin_.ivrtesterplugin.md)[]

*Defined in [packages/ivr-tester/src/configuration/TestRunnerConfig.ts:18](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L18)*

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Defined in [packages/ivr-tester/src/configuration/TestRunnerConfig.ts:16](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L16)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/configuration/TestRunnerConfig.ts:8](https://github.com/SketchingDev/ivr-tester/blob/3b0e141/packages/ivr-tester/src/configuration/TestRunnerConfig.ts#L8)*

Twilio client used to initiate the call to the IVR
