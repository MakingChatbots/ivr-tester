**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/AudioPlaybackCaller"](../modules/_call_audioplaybackcaller_.md) / AudioPlaybackCaller

# Class: AudioPlaybackCaller

## Hierarchy

* **AudioPlaybackCaller**

## Implements

* [Caller](../interfaces/_call_caller_.caller.md)\<Buffer>

## Index

### Properties

* [streamCounter](_call_audioplaybackcaller_.audioplaybackcaller.md#streamcounter)
* [bufferSize](_call_audioplaybackcaller_.audioplaybackcaller.md#buffersize)
* [msBetweenSendingBuffer](_call_audioplaybackcaller_.audioplaybackcaller.md#msbetweensendingbuffer)

### Methods

* [call](_call_audioplaybackcaller_.audioplaybackcaller.md#call)
* [createCallEndedEvent](_call_audioplaybackcaller_.audioplaybackcaller.md#createcallendedevent)
* [createMediaEvent](_call_audioplaybackcaller_.audioplaybackcaller.md#createmediaevent)
* [createTwilioMediaStreamStartEvent](_call_audioplaybackcaller_.audioplaybackcaller.md#createtwiliomediastreamstartevent)

## Properties

### streamCounter

• `Private` **streamCounter**: number = 0

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:10](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L10)*

___

### bufferSize

▪ `Static` `Private` **bufferSize**: number = 1000

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:8](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L8)*

___

### msBetweenSendingBuffer

▪ `Static` `Private` **msBetweenSendingBuffer**: number = 250

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:7](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L7)*

## Methods

### call

▸ **call**(`mulawAudio`: Buffer, `streamUrl`: URL \| string): Promise\<unknown>

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:12](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`mulawAudio` | Buffer |
`streamUrl` | URL \| string |

**Returns:** Promise\<unknown>

___

### createCallEndedEvent

▸ `Static` `Private`**createCallEndedEvent**(): string

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:72](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L72)*

**Returns:** string

___

### createMediaEvent

▸ `Static` `Private`**createMediaEvent**(`sid`: string, `payload`: Buffer): string

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:62](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L62)*

#### Parameters:

Name | Type |
------ | ------ |
`sid` | string |
`payload` | Buffer |

**Returns:** string

___

### createTwilioMediaStreamStartEvent

▸ `Static` `Private`**createTwilioMediaStreamStartEvent**(`sid`: string): string

*Defined in [packages/ivr-tester/src/call/AudioPlaybackCaller.ts:49](https://github.com/SketchingDev/ivr-tester/blob/3b9838d/packages/ivr-tester/src/call/AudioPlaybackCaller.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`sid` | string |

**Returns:** string
