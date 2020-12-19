**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/dtmf/DtmfBufferGenerator"](../modules/_call_dtmf_dtmfbuffergenerator_.md) / DtmfBufferGenerator

# Interface: DtmfBufferGenerator

Implementing class generates stream of DTMF encoded in an 8 bit PCM encoding (MULAW) at 8000 Hertz

## Hierarchy

* **DtmfBufferGenerator**

## Implemented by

* [UlawDtmfBufferGenerator](../classes/_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

## Index

### Methods

* [generate](_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md#generate)

## Methods

### generate

▸ **generate**(`dtmfSequence`: string): Buffer

*Defined in [packages/ivr-tester/src/call/dtmf/DtmfBufferGenerator.ts:9](https://github.com/SketchingDev/ivr-tester/blob/3ff21e1/packages/ivr-tester/src/call/dtmf/DtmfBufferGenerator.ts#L9)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`dtmfSequence` | string | Supported digits are 0123456789*# and w. w represents a pause of 0.5s.  |

**Returns:** Buffer
