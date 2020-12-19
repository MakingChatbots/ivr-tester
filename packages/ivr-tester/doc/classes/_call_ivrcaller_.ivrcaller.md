**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/IvrCaller"](../modules/_call_ivrcaller_.md) / IvrCaller

# Class: IvrCaller

## Hierarchy

* **IvrCaller**

## Index

### Constructors

* [constructor](_call_ivrcaller_.ivrcaller.md#constructor)

### Properties

* [twilioClient](_call_ivrcaller_.ivrcaller.md#twilioclient)

### Methods

* [call](_call_ivrcaller_.ivrcaller.md#call)
* [addParameters](_call_ivrcaller_.ivrcaller.md#addparameters)
* [extractParameters](_call_ivrcaller_.ivrcaller.md#extractparameters)

## Constructors

### constructor

\+ **new IvrCaller**(`twilioClient?`: Twilio): [IvrCaller](_call_ivrcaller_.ivrcaller.md)

*Defined in [packages/ivr-tester/src/call/IvrCaller.ts:16](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/call/IvrCaller.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`twilioClient?` | Twilio |

**Returns:** [IvrCaller](_call_ivrcaller_.ivrcaller.md)

## Properties

### twilioClient

• `Private` `Optional` `Readonly` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/call/IvrCaller.ts:17](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/call/IvrCaller.ts#L17)*

## Methods

### call

▸ **call**(`call`: TestSubject, `streamUrl`: URL \| string): Promise\<any>

*Defined in [packages/ivr-tester/src/call/IvrCaller.ts:37](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/call/IvrCaller.ts#L37)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | TestSubject |
`streamUrl` | URL \| string |

**Returns:** Promise\<any>

___

### addParameters

▸ `Static` `Private`**addParameters**(`stream`: Stream, `call`: Call): void

*Defined in [packages/ivr-tester/src/call/IvrCaller.ts:19](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/call/IvrCaller.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`stream` | Stream |
`call` | Call |

**Returns:** void

___

### extractParameters

▸ `Static`**extractParameters**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_ivrcaller_.twiliomediastreamstartevent.md)): Call

*Defined in [packages/ivr-tester/src/call/IvrCaller.ts:24](https://github.com/SketchingDev/ivr-tester/blob/dbcb3f7/packages/ivr-tester/src/call/IvrCaller.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_ivrcaller_.twiliomediastreamstartevent.md) |

**Returns:** Call
