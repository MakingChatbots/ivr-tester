**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["dtmf/UlawDtmfBufferGenerator"](../modules/_dtmf_ulawdtmfbuffergenerator_.md) / UlawDtmfBufferGenerator

# Class: UlawDtmfBufferGenerator

Generates stream of DTMF encoded in an 8 bit PCM encoding (MULAW) at 8000 Hertz

## Hierarchy

* **UlawDtmfBufferGenerator**

## Implements

* [DtmfBufferGenerator](../interfaces/_dtmf_dtmfplayer_.dtmfbuffergenerator.md)

## Index

### Constructors

* [constructor](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#constructor)

### Properties

* [paths](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#paths)
* [rawCache](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#rawcache)
* [DEFAULT\_RAW\_BASE\_PATH](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#default_raw_base_path)
* [DIGIT\_SEPARATOR](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#digit_separator)
* [VALID\_DTMF\_DIGITS](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#valid_dtmf_digits)

### Methods

* [generate](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#generate)
* [getRawBuffer](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#getrawbuffer)
* [initiatePathsToRawFiles](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#initiatepathstorawfiles)
* [validateDigits](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md#validatedigits)

## Constructors

### constructor

\+ **new UlawDtmfBufferGenerator**(`rawFilesBasePath?`: string): [UlawDtmfBufferGenerator](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:31](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L31)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`rawFilesBasePath` | string | UlawDtmfBufferGenerator.DEFAULT\_RAW\_BASE\_PATH |

**Returns:** [UlawDtmfBufferGenerator](_dtmf_ulawdtmfbuffergenerator_.ulawdtmfbuffergenerator.md)

## Properties

### paths

• `Private` `Readonly` **paths**: Map\<string, string> = new Map\<string, string>()

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:30](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L30)*

___

### rawCache

• `Private` `Readonly` **rawCache**: Map\<string, Buffer> = new Map\<string, Buffer>()

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:31](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L31)*

___

### DEFAULT\_RAW\_BASE\_PATH

▪ `Static` `Private` `Readonly` **DEFAULT\_RAW\_BASE\_PATH**: string = path.join( \_\_dirname, "./raw/" )

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:25](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L25)*

___

### DIGIT\_SEPARATOR

▪ `Static` `Private` `Readonly` **DIGIT\_SEPARATOR**: "" = ""

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:24](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L24)*

___

### VALID\_DTMF\_DIGITS

▪ `Static` `Private` `Readonly` **VALID\_DTMF\_DIGITS**: string[] = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#", "w", ]

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:9](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L9)*

## Methods

### generate

▸ **generate**(`digits`: string): Buffer

*Implementation of [DtmfBufferGenerator](../interfaces/_dtmf_dtmfplayer_.dtmfbuffergenerator.md)*

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:55](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`digits` | string |

**Returns:** Buffer

___

### getRawBuffer

▸ `Private`**getRawBuffer**(`digit`: string): Buffer

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:69](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L69)*

#### Parameters:

Name | Type |
------ | ------ |
`digit` | string |

**Returns:** Buffer

___

### initiatePathsToRawFiles

▸ `Private`**initiatePathsToRawFiles**(`basePath`: string): void

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:39](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L39)*

#### Parameters:

Name | Type |
------ | ------ |
`basePath` | string |

**Returns:** void

___

### validateDigits

▸ `Static` `Private`**validateDigits**(`digits`: string[]): void

*Defined in [packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts:80](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/dtmf/UlawDtmfBufferGenerator.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`digits` | string[] |

**Returns:** void
