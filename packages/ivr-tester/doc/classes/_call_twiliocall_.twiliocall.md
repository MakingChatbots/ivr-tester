**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/TwilioCall"](../modules/_call_twiliocall_.md) / TwilioCall

# Class: TwilioCall

## Hierarchy

* [TypedEmitter](_emitter_.typedemitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

  ↳ **TwilioCall**

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>
* [Call](../interfaces/_call_call_.call.md)

## Index

### Constructors

* [constructor](_call_twiliocall_.twiliocall.md#constructor)

### Properties

* [connection](_call_twiliocall_.twiliocall.md#connection)
* [dtmfGenerator](_call_twiliocall_.twiliocall.md#dtmfgenerator)
* [processMessageReference](_call_twiliocall_.twiliocall.md#processmessagereference)
* [serverClosedConnectionReference](_call_twiliocall_.twiliocall.md#serverclosedconnectionreference)
* [streamSid](_call_twiliocall_.twiliocall.md#streamsid)
* [debug](_call_twiliocall_.twiliocall.md#debug)

### Methods

* [close](_call_twiliocall_.twiliocall.md#close)
* [closeConnection](_call_twiliocall_.twiliocall.md#closeconnection)
* [emit](_call_twiliocall_.twiliocall.md#emit)
* [getStream](_call_twiliocall_.twiliocall.md#getstream)
* [isOpen](_call_twiliocall_.twiliocall.md#isopen)
* [off](_call_twiliocall_.twiliocall.md#off)
* [on](_call_twiliocall_.twiliocall.md#on)
* [processMessage](_call_twiliocall_.twiliocall.md#processmessage)
* [sendDtmfTone](_call_twiliocall_.twiliocall.md#senddtmftone)
* [sendMedia](_call_twiliocall_.twiliocall.md#sendmedia)
* [serverClosedConnection](_call_twiliocall_.twiliocall.md#serverclosedconnection)

## Constructors

### constructor

\+ **new TwilioCall**(`connection`: ws, `dtmfGenerator`: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)): [TwilioCall](_call_twiliocall_.twiliocall.md)

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:22](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`connection` | ws |
`dtmfGenerator` | [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md) |

**Returns:** [TwilioCall](_call_twiliocall_.twiliocall.md)

## Properties

### connection

• `Private` `Readonly` **connection**: ws

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:25](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L25)*

___

### dtmfGenerator

• `Private` `Readonly` **dtmfGenerator**: [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:26](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L26)*

___

### processMessageReference

• `Private` `Readonly` **processMessageReference**: (message: string) => void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:16](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L16)*

___

### serverClosedConnectionReference

• `Private` `Readonly` **serverClosedConnectionReference**: (a: number, b: string) => void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:17](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L17)*

___

### streamSid

• `Private` **streamSid**: string \| undefined

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:22](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L22)*

___

### debug

▪ `Static` `Private` **debug**: Debugger = Debugger.getTwilioDebugger()

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:14](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L14)*

## Methods

### close

▸ **close**(`reason`: string): void

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:38](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`reason` | string |

**Returns:** void

___

### closeConnection

▸ `Private`**closeConnection**(): void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:55](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L55)*

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: CallEvents[K]): boolean

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[emit](_emitter_.typedemitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | CallEvents[K] |

**Returns:** boolean

___

### getStream

▸ **getStream**(): ws

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:132](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L132)*

**Returns:** ws

___

### isOpen

▸ **isOpen**(): boolean

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:43](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L43)*

**Returns:** boolean

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<CallEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[off](_emitter_.typedemitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<CallEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[on](_emitter_.typedemitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

___

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:67](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### sendDtmfTone

▸ **sendDtmfTone**(`dtmfSequence`: string): void

*Implementation of [Call](../interfaces/_call_call_.call.md)*

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:92](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string |

**Returns:** void

___

### sendMedia

▸ **sendMedia**(`payload`: Buffer, `name?`: string): void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:100](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L100)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |
`name?` | string |

**Returns:** void

___

### serverClosedConnection

▸ `Private`**serverClosedConnection**(): void

*Defined in [packages/ivr-tester/src/call/TwilioCall.ts:50](https://github.com/SketchingDev/ivr-tester/blob/c05dd5d/packages/ivr-tester/src/call/TwilioCall.ts#L50)*

**Returns:** void
