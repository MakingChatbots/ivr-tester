**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/TwilioCallServer"](../modules/_testing_twiliocallserver_.md) / TwilioCallServer

# Class: TwilioCallServer

## Hierarchy

* [TypedEmitter](_emitter_.typedemitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

  ↳ **TwilioCallServer**

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>
* [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)

## Index

### Constructors

* [constructor](_testing_twiliocallserver_.twiliocallserver.md#constructor)

### Properties

* [dtmfBufferGenerator](_testing_twiliocallserver_.twiliocallserver.md#dtmfbuffergenerator)
* [testAssigner](_testing_twiliocallserver_.twiliocallserver.md#testassigner)
* [testExecutor](_testing_twiliocallserver_.twiliocallserver.md#testexecutor)
* [wss](_testing_twiliocallserver_.twiliocallserver.md#wss)
* [TestCouldNotBeAssignedReason](_testing_twiliocallserver_.twiliocallserver.md#testcouldnotbeassignedreason)

### Methods

* [callConnected](_testing_twiliocallserver_.twiliocallserver.md#callconnected)
* [closed](_testing_twiliocallserver_.twiliocallserver.md#closed)
* [emit](_testing_twiliocallserver_.twiliocallserver.md#emit)
* [listen](_testing_twiliocallserver_.twiliocallserver.md#listen)
* [off](_testing_twiliocallserver_.twiliocallserver.md#off)
* [on](_testing_twiliocallserver_.twiliocallserver.md#on)
* [serverError](_testing_twiliocallserver_.twiliocallserver.md#servererror)
* [stop](_testing_twiliocallserver_.twiliocallserver.md#stop)
* [convertToWebSocketUrl](_testing_twiliocallserver_.twiliocallserver.md#converttowebsocketurl)
* [formatServerUrl](_testing_twiliocallserver_.twiliocallserver.md#formatserverurl)

## Constructors

### constructor

\+ **new TwilioCallServer**(`dtmfBufferGenerator`: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md), `testAssigner`: [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md), `testExecutor`: [TestExecutor](../interfaces/_testing_defaulttestexecutor_.testexecutor.md)): [TwilioCallServer](_testing_twiliocallserver_.twiliocallserver.md)

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:30](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`dtmfBufferGenerator` | [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md) |
`testAssigner` | [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md) |
`testExecutor` | [TestExecutor](../interfaces/_testing_defaulttestexecutor_.testexecutor.md) |

**Returns:** [TwilioCallServer](_testing_twiliocallserver_.twiliocallserver.md)

## Properties

### dtmfBufferGenerator

• `Private` `Readonly` **dtmfBufferGenerator**: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:33](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L33)*

___

### testAssigner

• `Private` `Readonly` **testAssigner**: [TestAssigner](../interfaces/_testing_iteratingtestassigner_.testassigner.md)

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:34](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L34)*

___

### testExecutor

• `Private` `Readonly` **testExecutor**: [TestExecutor](../interfaces/_testing_defaulttestexecutor_.testexecutor.md)

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:35](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L35)*

___

### wss

• `Private` **wss**: Server

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:30](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L30)*

___

### TestCouldNotBeAssignedReason

▪ `Static` `Private` **TestCouldNotBeAssignedReason**: string = "TestCouldNotBeAssigned"

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:28](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L28)*

## Methods

### callConnected

▸ `Private`**callConnected**(`callWebSocket`: ws): void

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:107](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L107)*

#### Parameters:

Name | Type |
------ | ------ |
`callWebSocket` | ws |

**Returns:** void

___

### closed

▸ `Private`**closed**(): void

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:121](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L121)*

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: CallServerEvents[K]): boolean

*Implementation of [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[emit](_emitter_.typedemitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | CallServerEvents[K] |

**Returns:** boolean

___

### listen

▸ **listen**(`port`: number): Promise\<URL>

*Implementation of [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)*

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:61](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L61)*

#### Parameters:

Name | Type |
------ | ------ |
`port` | number |

**Returns:** Promise\<URL>

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<CallServerEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

*Implementation of [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[off](_emitter_.typedemitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallServerEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<CallServerEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

*Implementation of [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[on](_emitter_.typedemitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallServerEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallServerEvents](../modules/_testing_twiliocallserver_.md#callserverevents)>

___

### serverError

▸ `Private`**serverError**(`error`: [Error](_configuration_configurationerror_.configurationerror.md#error)): void

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:126](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L126)*

#### Parameters:

Name | Type |
------ | ------ |
`error` | [Error](_configuration_configurationerror_.configurationerror.md#error) |

**Returns:** void

___

### stop

▸ **stop**(): Promise\<void>

*Implementation of [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)*

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:89](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L89)*

**Returns:** Promise\<void>

___

### convertToWebSocketUrl

▸ `Static`**convertToWebSocketUrl**(`serverUrl`: string \| URL): URL

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:53](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`serverUrl` | string \| URL |

**Returns:** URL

___

### formatServerUrl

▸ `Static` `Private`**formatServerUrl**(`server`: Server): URL

*Defined in [packages/ivr-tester/src/testing/TwilioCallServer.ts:40](https://github.com/SketchingDev/ivr-tester/blob/437ae33/packages/ivr-tester/src/testing/TwilioCallServer.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`server` | Server |

**Returns:** URL
