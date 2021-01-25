**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/Caller"](../modules/_call_caller_.md) / Caller

# Interface: Caller\<T>

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **Caller**

## Implemented by

* [AudioPlaybackCaller](../classes/_call_audioplaybackcaller_.audioplaybackcaller.md)
* [TwilioCaller](../classes/_call_twiliocaller_.twiliocaller.md)

## Index

### Methods

* [call](_call_caller_.caller.md#call)

## Methods

### call

▸ **call**(`call`: T, `streamUrl`: URL \| string): Promise\<[RequestedCall](../modules/_call_caller_.md#requestedcall)>

*Defined in [packages/ivr-tester/src/call/Caller.ts:17](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/ivr-tester/src/call/Caller.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`call` | T |
`streamUrl` | URL \| string |

**Returns:** Promise\<[RequestedCall](../modules/_call_caller_.md#requestedcall)>
