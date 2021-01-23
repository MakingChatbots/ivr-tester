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
* [DIGIT\_SEPARATOR](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#digit_separator)
* [VALID\_DTMF\_DIGITS](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#valid_dtmf_digits)

### Methods

* [generate](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#generate)
* [getRawBuffer](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#getrawbuffer)
* [initiatePathsToRawFiles](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#initiatepathstorawfiles)
* [validateDigits](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#validatedigits)

## Constructors

### constructor

\+ **new UlawDtmfBufferGenerator**(`rawFilesBasePath?`: string): [UlawDtmfBufferGenerator](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:28](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L28)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`rawFilesBasePath` | string | UlawDtmfBufferGenerator.DEFAULT\_RAW\_BASE\_PATH |

**Returns:** [UlawDtmfBufferGenerator](_call_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

## Properties

### paths

• `Private` `Readonly` **paths**: Map\<string, string> = new Map\<string, string>()

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:27](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L27)*

___

### rawCache

• `Private` `Readonly` **rawCache**: Map\<string, Buffer> = new Map\<string, Buffer>()

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:28](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L28)*

___

### DEFAULT\_RAW\_BASE\_PATH

▪ `Static` `Private` `Readonly` **DEFAULT\_RAW\_BASE\_PATH**: string = path.join( \_\_dirname, "./raw/" )

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:22](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L22)*

___

### DIGIT\_SEPARATOR

▪ `Static` `Private` `Readonly` **DIGIT\_SEPARATOR**: "" = ""

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:21](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L21)*

___

### VALID\_DTMF\_DIGITS

▪ `Static` `Private` `Readonly` **VALID\_DTMF\_DIGITS**: string[] = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", "w", ]

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:6](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L6)*

## Methods

### generate

▸ **generate**(`digits`: string): Buffer

*Implementation of [DtmfBufferGenerator](../interfaces/_call_dtmf_dtmfbuffergenerator_.dtmfbuffergenerator.md)*

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:52](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`digits` | string |

**Returns:** Buffer

___

### getRawBuffer

▸ `Private`**getRawBuffer**(`digit`: string): Buffer

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:66](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`digit` | string |

**Returns:** Buffer

___

### initiatePathsToRawFiles

▸ `Private`**initiatePathsToRawFiles**(`basePath`: string): void

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:36](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`basePath` | string |

**Returns:** void

___

### validateDigits

▸ `Static` `Private`**validateDigits**(`digits`: string[]): void

*Defined in [packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts:77](https://github.com/SketchingDev/ivr-tester/blob/734e920/packages/ivr-tester/src/call/dtmf/UlawDtmfBufferGenerator.ts#L77)*

#### Parameters:

Name | Type |
------ | ------ |
`digits` | string[] |

**Returns:** void
