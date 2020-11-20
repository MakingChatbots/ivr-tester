**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["handlers/inOrder"](../modules/_handlers_inorder_.md) / Call

# Interface: Call

## Hierarchy

* **Call**

## Implemented by

* [TwilioCall](../classes/_handlers_twiliocall_.twiliocall.md)

## Index

### Methods

* [sendDtmfTone](_handlers_inorder_.call.md#senddtmftone)
* [sendMedia](_handlers_inorder_.call.md#sendmedia)

## Methods

### sendDtmfTone

▸ **sendDtmfTone**(`dtmfSequence`: string): void

*Defined in [packages/ivr-tester/src/handlers/inOrder.ts:5](https://github.com/SketchingDev/ivr-tester/blob/f08915c/packages/ivr-tester/src/handlers/inOrder.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string |

**Returns:** void

___

### sendMedia

▸ **sendMedia**(`buffer`: Buffer): void

*Defined in [packages/ivr-tester/src/handlers/inOrder.ts:6](https://github.com/SketchingDev/ivr-tester/blob/f08915c/packages/ivr-tester/src/handlers/inOrder.ts#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`buffer` | Buffer |

**Returns:** void
