**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testRunner"](../modules/_testrunner_.md) / TestRunnerConfig

# Interface: TestRunnerConfig

## Hierarchy

* **TestRunnerConfig**

  ↳ [Config](_config_.config.md)

## Index

### Properties

* [plugins](_testrunner_.testrunnerconfig.md#plugins)
* [publicServerUrl](_testrunner_.testrunnerconfig.md#publicserverurl)
* [twilioClient](_testrunner_.testrunnerconfig.md#twilioclient)

## Properties

### plugins

• `Optional` **plugins**: [LifecycleHookPlugin](_plugins_lifecycle_lifecyclehookplugin_.lifecyclehookplugin.md)[]

*Defined in [packages/ivr-tester/src/testRunner.ts:28](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/testRunner.ts#L28)*

___

### publicServerUrl

• `Optional` **publicServerUrl**: string \| undefined

*Defined in [packages/ivr-tester/src/testRunner.ts:26](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/testRunner.ts#L26)*

URL of the server that is publicly accessible. This is the
server that Twilio connects to when creating the bi-directional
stream of the call
This value can be overridden by setting the environment variable PUBLIC_SERVER_URL

___

### twilioClient

• `Optional` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/testRunner.ts:18](https://github.com/SketchingDev/ivr-tester/blob/cbdfab7/packages/ivr-tester/src/testRunner.ts#L18)*

Twilio client used to initiate the call to the IVR
