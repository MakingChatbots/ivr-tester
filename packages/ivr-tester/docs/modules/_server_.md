**[IVR Tester](../README.md)**

> [Globals](../README.md) / "server"

# Module: "server"

## Index

### Interfaces

* [CallHandlingServer](../interfaces/_server_.callhandlingserver.md)
* [ServerConfig](../interfaces/_server_.serverconfig.md)

### Functions

* [formatServerUrl](_server_.md#formatserverurl)
* [startServerListening](_server_.md#startserverlistening)

## Functions

### formatServerUrl

▸ `Const`**formatServerUrl**(`server`: [CallHandlingServer](../interfaces/_server_.callhandlingserver.md)): URL

*Defined in [packages/ivr-tester/src/server.ts:20](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`server` | [CallHandlingServer](../interfaces/_server_.callhandlingserver.md) |

**Returns:** URL

___

### startServerListening

▸ `Const`**startServerListening**(`config`: [ServerConfig](../interfaces/_server_.serverconfig.md), `ivrTest`: [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)[], `testEventEmitter`: [TestEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.md#testeventemitter)): Promise\<[CallHandlingServer](../interfaces/_server_.callhandlingserver.md)>

*Defined in [packages/ivr-tester/src/server.ts:81](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/server.ts#L81)*

#### Parameters:

Name | Type |
------ | ------ |
`config` | [ServerConfig](../interfaces/_server_.serverconfig.md) |
`ivrTest` | [IvrTest](../interfaces/_handlers_testhandler_.ivrtest.md)[] |
`testEventEmitter` | [TestEventEmitter](_plugins_lifecycle_lifecycleeventemitter_.md#testeventemitter) |

**Returns:** Promise\<[CallHandlingServer](../interfaces/_server_.callhandlingserver.md)>
