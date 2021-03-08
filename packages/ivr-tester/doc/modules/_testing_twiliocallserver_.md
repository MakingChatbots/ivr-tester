**[IVR Tester](../README.md)**

> [Globals](../README.md) / "testing/TwilioCallServer"

# Module: "testing/TwilioCallServer"

## Index

### Classes

* [TwilioCallServer](../classes/_testing_twiliocallserver_.twiliocallserver.md)

### Interfaces

* [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)

### Type aliases

* [CallServerEvents](_testing_twiliocallserver_.md#callserverevents)

## Type aliases

### CallServerEvents

Ƭ  **CallServerEvents**: { callConnected: { call: [Call](../interfaces/_call_call_.call.md)  } ; error: { error: [Error](../classes/_configuration_configurationerror_.configurationerror.md#error)  } ; listening: { localUrl: URL  } ; stopped: undefined ; testStarted: { testSession: [TestSession](../interfaces/_testrunner_.testsession.md)  }  }

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:11](https://github.com/SketchingDev/ivr-tester/blob/e4629d5/packages/ivr-tester/src/testing/TwilioCallServer.ts#L11)*

#### Type declaration:

Name | Type |
------ | ------ |
`callConnected` | { call: [Call](../interfaces/_call_call_.call.md)  } |
`error` | { error: [Error](../classes/_configuration_configurationerror_.configurationerror.md#error)  } |
`listening` | { localUrl: URL  } |
`stopped` | undefined |
`testStarted` | { testSession: [TestSession](../interfaces/_testrunner_.testsession.md)  } |
