**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/Call"](../modules/_call_call_.md) / Call

# Interface: Call

Represents an active call

## Hierarchy

* **Call**

## Index

### Methods

* [getStream](_call_call_.call.md#getstream)
* [hangUp](_call_call_.call.md#hangup)
* [sendDtmfTone](_call_call_.call.md#senddtmftone)
* [sendMedia](_call_call_.call.md#sendmedia)

## Methods

### getStream

▸ **getStream**(): ws

*Defined in [packages/ivr-tester/src/call/Call.ts:17](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/Call.ts#L17)*

**Returns:** ws

___

### hangUp

▸ **hangUp**(): void

*Defined in [packages/ivr-tester/src/call/Call.ts:19](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/Call.ts#L19)*

**Returns:** void

___

### sendDtmfTone

▸ **sendDtmfTone**(`dtmfSequence`: string): void

*Defined in [packages/ivr-tester/src/call/Call.ts:10](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/Call.ts#L10)*

Sends DTMF tone to the call

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string |

**Returns:** void

___

### sendMedia

▸ **sendMedia**(`buffer`: Buffer): void

*Defined in [packages/ivr-tester/src/call/Call.ts:15](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/Call.ts#L15)*

Sends 8 bit PCM encoded (MULAW) at 8000 Hertz media to call

#### Parameters:

Name | Type |
------ | ------ |
`buffer` | Buffer |

**Returns:** void
