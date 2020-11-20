**[IVR Tester](../README.md)**

> [Globals](../README.md) / "twilio"

# Module: "twilio"

## Index

### Enumerations

* [TwilioConnectionEvents](../enums/_twilio_.twilioconnectionevents.md)

### Interfaces

* [Call](../interfaces/_twilio_.call.md)
* [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md)

### Object literals

* [callParameterSerializer](_twilio_.md#callparameterserializer)

## Object literals

### callParameterSerializer

▪ `Const` **callParameterSerializer**: object

*Defined in [packages/ivr-tester/src/twilio.ts:23](https://github.com/SketchingDev/ivr-tester/blob/f08915c/packages/ivr-tester/src/twilio.ts#L23)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`addParameters` | function | (stream: any, call: [Call](../interfaces/_twilio_.call.md)) => void |
`extractParameters` | function | (event: [TwilioMediaStreamStartEvent](../interfaces/_twilio_.twiliomediastreamstartevent.md)) => [Call](../interfaces/_twilio_.call.md) |
