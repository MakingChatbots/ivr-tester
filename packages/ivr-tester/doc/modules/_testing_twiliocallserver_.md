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

Ƭ  **CallServerEvents**: { callConnected: { call: [Call](../interfaces/_call_call_.call.md)  } ; error: { error: [Error](../classes/_configuration_configurationerror_.configurationerror.md#error)  } ; listening: { localUrl: URL  } ; stopped: undefined ; testStarted: { testInstance: [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md)  }  }

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:11](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L11)*

#### Type declaration:

Name | Type |
------ | ------ |
`callConnected` | { call: [Call](../interfaces/_call_call_.call.md)  } |
`error` | { error: [Error](../classes/_configuration_configurationerror_.configurationerror.md#error)  } |
`listening` | { localUrl: URL  } |
`stopped` | undefined |
`testStarted` | { testInstance: [TestInstance](../interfaces/_testing_test_testinstanceclass_.testinstance.md)  } |
