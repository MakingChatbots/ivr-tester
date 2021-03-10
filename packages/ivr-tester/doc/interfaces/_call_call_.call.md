**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/Call"](../modules/_call_call_.md) / Call

# Interface: Call

Represents an active call

## Hierarchy

* [Emitter](_emitter_.emitter.md)\<[CallEvents](../modules/_call_call_.md#callevents)>

  ↳ **Call**

## Implemented by

* [TwilioCall](../classes/_call_twiliocall_.twiliocall.md)

## Index

### Methods

* [close](_call_call_.call.md#close)
* [emit](_call_call_.call.md#emit)
* [getStream](_call_call_.call.md#getstream)
* [isOpen](_call_call_.call.md#isopen)
* [off](_call_call_.call.md#off)
* [on](_call_call_.call.md#on)
* [sendDtmfTone](_call_call_.call.md#senddtmftone)
* [sendMedia](_call_call_.call.md#sendmedia)

## Methods

### close

▸ **close**(`reason`: string): void

*Defined in [packages/ivr-tester/src/call/Call.ts:29](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/Call.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`reason` | string |

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: CallEvents[K]): void

*Inherited from [Emitter](_emitter_.emitter.md).[emit](_emitter_.emitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:13](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L13)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | CallEvents[K] |

**Returns:** void

___

### getStream

▸ **getStream**(): ws

*Defined in [packages/ivr-tester/src/call/Call.ts:27](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/Call.ts#L27)*

**Returns:** ws

___

### isOpen

▸ **isOpen**(): boolean

*Defined in [packages/ivr-tester/src/call/Call.ts:31](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/Call.ts#L31)*

**Returns:** boolean

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<CallEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[off](_emitter_.emitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:12](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L12)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallEvents[K]> |

**Returns:** void

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<CallEvents[K]>): void

*Inherited from [Emitter](_emitter_.emitter.md).[on](_emitter_.emitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:11](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[CallEvents](../modules/_call_call_.md#callevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<CallEvents[K]> |

**Returns:** void

___

### sendDtmfTone

▸ **sendDtmfTone**(`dtmfSequence`: string): void

*Defined in [packages/ivr-tester/src/call/Call.ts:20](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/Call.ts#L20)*

Sends DTMF tone to the call

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string |

**Returns:** void

___

### sendMedia

▸ **sendMedia**(`buffer`: Buffer): void

*Defined in [packages/ivr-tester/src/call/Call.ts:25](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/call/Call.ts#L25)*

Sends 8 bit PCM encoded (MULAW) at 8000 Hertz media to call

#### Parameters:

Name | Type |
------ | ------ |
`buffer` | Buffer |

**Returns:** void
