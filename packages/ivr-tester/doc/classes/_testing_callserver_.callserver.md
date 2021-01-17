**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/CallServer"](../modules/_testing_callserver_.md) / CallServer

# Class: CallServer

## Hierarchy

* **CallServer**

## Index

### Constructors

* [constructor](_testing_callserver_.callserver.md#constructor)

### Properties

* [dtmfBufferGenerator](_testing_callserver_.callserver.md#dtmfbuffergenerator)
* [probe](_testing_callserver_.callserver.md#probe)
* [testAssigner](_testing_callserver_.callserver.md#testassigner)
* [testExecutor](_testing_callserver_.callserver.md#testexecutor)

### Methods

* [callConnected](_testing_callserver_.callserver.md#callconnected)
* [listen](_testing_callserver_.callserver.md#listen)
* [convertToWebSocketUrl](_testing_callserver_.callserver.md#converttowebsocketurl)
* [formatServerUrl](_testing_callserver_.callserver.md#formatserverurl)

## Constructors

### constructor

\+ **new CallServer**(`dtmfBufferGenerator`: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md), `testAssigner`: [TestAssigner](../interfaces/_testing_callserver_.testassigner.md), `testExecutor`: [TestExecutor](../interfaces/_testing_callserver_.testexecutor.md), `probe?`: [CallServerEventProbe](../interfaces/_testing_callserver_.callservereventprobe.md)): [CallServer](_testing_callserver_.callserver.md)

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:41](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L41)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`dtmfBufferGenerator` | [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md) | - |
`testAssigner` | [TestAssigner](../interfaces/_testing_callserver_.testassigner.md) | - |
`testExecutor` | [TestExecutor](../interfaces/_testing_callserver_.testexecutor.md) | - |
`probe` | [CallServerEventProbe](../interfaces/_testing_callserver_.callservereventprobe.md) | {
      callConnected: () => undefined,
      callHungUpAsNoTestAssigned: () => undefined,
    } |

**Returns:** [CallServer](_testing_callserver_.callserver.md)

## Properties

### dtmfBufferGenerator

• `Private` `Readonly` **dtmfBufferGenerator**: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:43](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L43)*

___

### probe

• `Private` `Readonly` **probe**: [CallServerEventProbe](../interfaces/_testing_callserver_.callservereventprobe.md)

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:46](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L46)*

___

### testAssigner

• `Private` `Readonly` **testAssigner**: [TestAssigner](../interfaces/_testing_callserver_.testassigner.md)

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:44](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L44)*

___

### testExecutor

• `Private` `Readonly` **testExecutor**: [TestExecutor](../interfaces/_testing_callserver_.testexecutor.md)

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:45](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L45)*

## Methods

### callConnected

▸ `Private`**callConnected**(`callWebSocket`: ws): void

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:93](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L93)*

#### Parameters:

Name | Type |
------ | ------ |
`callWebSocket` | ws |

**Returns:** void

___

### listen

▸ **listen**(`port`: number): Promise\<CallHandlingServer>

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:73](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`port` | number |

**Returns:** Promise\<CallHandlingServer>

___

### convertToWebSocketUrl

▸ `Static`**convertToWebSocketUrl**(`serverUrl`: string \| URL): URL

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:65](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`serverUrl` | string \| URL |

**Returns:** URL

___

### formatServerUrl

▸ `Static` `Private`**formatServerUrl**(`server`: Server): URL

*Defined in [packages/ivr-tester/src/testing/CallServer.ts:52](https://github.com/SketchingDev/ivr-tester/blob/5493745/packages/ivr-tester/src/testing/CallServer.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`server` | Server |

**Returns:** URL
