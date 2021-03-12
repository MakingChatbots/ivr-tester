**[IVR Tester](../README.md)**

> [Globals](../README.md) / "call/dtmf/dtmfSequenceUtils"

# Module: "call/dtmf/dtmfSequenceUtils"

## Index

### Functions

* [convertToDtmfArray](_call_dtmf_dtmfsequenceutils_.md#converttodtmfarray)
* [dtmfSequenceValidator](_call_dtmf_dtmfsequenceutils_.md#dtmfsequencevalidator)

## Functions

### convertToDtmfArray

▸ **convertToDtmfArray**(`dtmfSequence`: string \| string[]): string[]

*Defined in [packages/ivr-tester/src/call/dtmf/dtmfSequenceUtils.ts:17](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/dtmfSequenceUtils.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`dtmfSequence` | string \| string[] |

**Returns:** string[]

___

### dtmfSequenceValidator

▸ **dtmfSequenceValidator**(`possibleDtmfSequence`: string \| string[]): { valid: true  } \| { reason: string ; valid: false  }

*Defined in [packages/ivr-tester/src/call/dtmf/dtmfSequenceUtils.ts:38](https://github.com/SketchingDev/ivr-tester/blob/8e8019a/packages/ivr-tester/src/call/dtmf/dtmfSequenceUtils.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`possibleDtmfSequence` | string \| string[] |

**Returns:** { valid: true  } \| { reason: string ; valid: false  }
