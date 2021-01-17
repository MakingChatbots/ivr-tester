**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/TwilioCaller"](../modules/_call_twiliocaller_.md) / TwilioCaller

# Class: TwilioCaller

## Hierarchy

* **TwilioCaller**

## Implements

* [Caller](../interfaces/_call_caller_.caller.md)\<TestSubject>

## Index

### Constructors

* [constructor](_call_twiliocaller_.twiliocaller.md#constructor)

### Properties

* [twilioClient](_call_twiliocaller_.twiliocaller.md#twilioclient)
* [debug](_call_twiliocaller_.twiliocaller.md#debug)

### Methods

* [call](_call_twiliocaller_.twiliocaller.md#call)
* [addParameters](_call_twiliocaller_.twiliocaller.md#addparameters)
* [extractParameters](_call_twiliocaller_.twiliocaller.md#extractparameters)

## Constructors

### constructor

\+ **new TwilioCaller**(`twilioClient`: Twilio): [TwilioCaller](_call_twiliocaller_.twiliocaller.md)

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:18](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`twilioClient` | Twilio |

**Returns:** [TwilioCaller](_call_twiliocaller_.twiliocaller.md)

## Properties

### twilioClient

• `Private` `Readonly` **twilioClient**: Twilio

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:20](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L20)*

___

### debug

▪ `Static` `Private` **debug**: Debugger = Debugger.getTwilioDebugger()

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:18](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L18)*

## Methods

### call

▸ **call**(`call`: TestSubject, `streamUrl`: URL \| string): Promise\<unknown>

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:40](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | TestSubject |
`streamUrl` | URL \| string |

**Returns:** Promise\<unknown>

___

### addParameters

▸ `Static` `Private`**addParameters**(`stream`: Stream, `call`: Call): void

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:22](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`stream` | Stream |
`call` | Call |

**Returns:** void

___

### extractParameters

▸ `Static`**extractParameters**(`event`: [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md)): Call

*Defined in [packages/ivr-tester/src/call/TwilioCaller.ts:27](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/TwilioCaller.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | [TwilioMediaStreamStartEvent](../interfaces/_call_twiliocaller_.twiliomediastreamstartevent.md) |

**Returns:** Call
