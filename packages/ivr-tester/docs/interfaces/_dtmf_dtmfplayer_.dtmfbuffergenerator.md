**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["dtmf/DtmfPlayer"](../modules/_dtmf_dtmfplayer_.md) / DtmfBufferGenerator

# Interface: DtmfBufferGenerator

Generator of DTMF sequences

## Hierarchy

* **DtmfBufferGenerator**

## Implemented by

* [UlawDtmfBufferGenerator](../classes/_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

## Index

### Methods

* [generate](_dtmf_dtmfplayer_.dtmfbuffergenerator.md#generate)

## Methods

### generate

▸ **generate**(`digits`: string): Buffer

*Defined in [packages/ivr-tester/src/dtmf/DtmfPlayer.ts:8](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/DtmfPlayer.ts#L8)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`digits` | string | Supported digits are 0123456789*# and w. w represents a pause of 0.5s.  |

**Returns:** Buffer
