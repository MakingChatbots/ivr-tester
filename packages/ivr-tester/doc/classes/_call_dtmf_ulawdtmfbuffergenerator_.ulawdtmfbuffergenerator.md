**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["call/dtmf/UlawDtmfBufferGenerator"](../modules/_call_dtmf_ulawdtmfbuffergenerator_.md) / UlawDtmfBufferGenerator

# Class: UlawDtmfBufferGenerator

## Hierarchy

* **UlawDtmfBufferGenerator**

## Implements

* [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)

## Index

### Constructors

* [constructor](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#constructor)

### Properties

* [paths](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#paths)
* [rawCache](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#rawcache)
* [DEFAULT\_RAW\_BASE\_PATH](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#default_raw_base_path)

### Methods

* [generate](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#generate)
* [getRawBuffer](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#getrawbuffer)
* [initiatePathsToRawFiles](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#initiatepathstorawfiles)

## Constructors

### constructor

\+ **new UlawDtmfBufferGenerator**(`rawFilesBasePath?`: string): [UlawDtmfBufferGenerator](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:13](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L13)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`rawFilesBasePath` | string | UlawDtmfBufferGenerator.DEFAULT\_RAW\_BASE\_PATH |

**Returns:** [UlawDtmfBufferGenerator](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

## Properties

### paths

• `Private` `Readonly` **paths**: Map\<string, string> = new Map\<string, string>()

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:12](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L12)*

___

### rawCache

• `Private` `Readonly` **rawCache**: Map\<string, Buffer> = new Map\<string, Buffer>()

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:13](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L13)*

___

### DEFAULT\_RAW\_BASE\_PATH

▪ `Static` `Private` `Readonly` **DEFAULT\_RAW\_BASE\_PATH**: string = path.join( \_\_dirname, "./raw/" )

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:7](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L7)*

## Methods

### generate

▸ **generate**(`digits`: string): Buffer

*Implementation of [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)*

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:37](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L37)*

#### Parameters:

Name | Type |
------ | ------ |
`digits` | string |

**Returns:** Buffer

___

### getRawBuffer

▸ `Private`**getRawBuffer**(`digit`: string): Buffer

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:51](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`digit` | string |

**Returns:** Buffer

___

### initiatePathsToRawFiles

▸ `Private`**initiatePathsToRawFiles**(`basePath`: string): void

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:21](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`basePath` | string |

**Returns:** void
