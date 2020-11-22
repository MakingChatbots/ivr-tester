**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["handlers/TwilioCall"](../modules/_handlers_twiliocall_.md) / TwilioCall

# Class: TwilioCall

## Hierarchy

* **TwilioCall**

## Implements

* Call

## Index

### Constructors

* [constructor](_handlers_twiliocall_.twiliocall.md#constructor)

### Properties

* [connection](_handlers_twiliocall_.twiliocall.md#connection)
* [dtmfGenerator](_handlers_twiliocall_.twiliocall.md#dtmfgenerator)
* [processMessageReference](_handlers_twiliocall_.twiliocall.md#processmessagereference)
* [streamSid](_handlers_twiliocall_.twiliocall.md#streamsid)

### Methods

* [processMessage](_handlers_twiliocall_.twiliocall.md#processmessage)
* [sendDtmfTone](_handlers_twiliocall_.twiliocall.md#senddtmftone)
* [sendMedia](_handlers_twiliocall_.twiliocall.md#sendmedia)

## Constructors

### constructor

\+ **new TwilioCall**(`connection`: ws, `dtmfGenerator`: [DtmfBufferGenerator](../interfaces/_dtmf_dtmfplayer_.dtmfbuffergenerator.md)): [TwilioCall](_handlers_twiliocall_.twiliocall.md)

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:16](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`connection` | ws |
`dtmfGenerator` | [DtmfBufferGenerator](../interfaces/_dtmf_dtmfplayer_.dtmfbuffergenerator.md) |

**Returns:** [TwilioCall](_handlers_twiliocall_.twiliocall.md)

## Properties

### connection

• `Private` `Readonly` **connection**: ws

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:19](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L19)*

___

### dtmfGenerator

• `Private` `Readonly` **dtmfGenerator**: [DtmfBufferGenerator](../interfaces/_dtmf_dtmfplayer_.dtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:20](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L20)*

___

### processMessageReference

• `Private` `Readonly` **processMessageReference**: (message: string) => void

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:14](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L14)*

___

### streamSid

• `Private` **streamSid**: string \| undefined

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:16](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L16)*

## Methods

### processMessage

▸ `Private`**processMessage**(`message`: string): void

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:26](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** void

___

### sendDtmfTone

▸ **sendDtmfTone**(`dtmfSequence`: string): void

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:39](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L39)*

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string |

**Returns:** void

___

### sendMedia

▸ **sendMedia**(`payload`: Buffer): void

*Defined in [packages/ivr-tester/src/handlers/TwilioCall.ts:43](https://github.com/SketchingDev/ivr-tester/blob/1691bd9/packages/ivr-tester/src/handlers/TwilioCall.ts#L43)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** void
