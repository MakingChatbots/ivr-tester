IVR Tester

# IVR Tester

## Table of contents

### Classes

- [IvrTester](classes/ivrtester.md)
- [PluginManager](classes/pluginmanager.md)
- [StopTestRunnerWhenTestsComplete](classes/stoptestrunnerwhentestscomplete.md)
- [TypedEmitter](classes/typedemitter.md)

### Interfaces

- [CanRun](interfaces/canrun.md)
- [CannotRun](interfaces/cannotrun.md)
- [Config](interfaces/config.md)
- [Emitter](interfaces/emitter.md)
- [IvrNumber](interfaces/ivrnumber.md)
- [IvrTesterPlugin](interfaces/ivrtesterplugin.md)
- [RunnableTester](interfaces/runnabletester.md)
- [Scenario](interfaces/scenario.md)
- [Step](interfaces/step.md)
- [TestRunner](interfaces/testrunner.md)
- [TestRunnerManager](interfaces/testrunnermanager.md)
- [TestSession](interfaces/testsession.md)
- [Then](interfaces/then.md)
- [TranscriberFactory](interfaces/transcriberfactory.md)
- [TranscriberPlugin](interfaces/transcriberplugin.md)
- [TranscriptEvent](interfaces/transcriptevent.md)

### Type aliases

- [CanRunCheck](README.md#canruncheck)
- [TranscriptionEvents](README.md#transcriptionevents)
- [When](README.md#when)

### Functions

- [and](README.md#and)
- [consoleUserInterface](README.md#consoleuserinterface)
- [contains](README.md#contains)
- [containsSimilarTo](README.md#containssimilarto)
- [doNothing](README.md#donothing)
- [hangUp](README.md#hangup)
- [hasPart](README.md#haspart)
- [isAnything](README.md#isanything)
- [matches](README.md#matches)
- [or](README.md#or)
- [press](README.md#press)
- [similarTo](README.md#similarto)

## Type aliases

### CanRunCheck

Ƭ **CanRunCheck**: [*CanRun*](interfaces/canrun.md) \| [*CannotRun*](interfaces/cannotrun.md)

Defined in: [call/transcription/plugin/TranscriberFactory.ts:12](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberFactory.ts#L12)

___

### TranscriptionEvents

Ƭ **TranscriptionEvents**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`transcription` | [*TranscriptEvent*](interfaces/transcriptevent.md) |

Defined in: [call/transcription/plugin/TranscriberPlugin.ts:11](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/call/transcription/plugin/TranscriberPlugin.ts#L11)

___

### When

Ƭ **When**: (`transcript`: *string*) => *boolean*

#### Type declaration:

▸ (`transcript`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`transcript` | *string* |

**Returns:** *boolean*

Defined in: [testing/test/conditions/when/When.ts:1](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/When.ts#L1)

## Functions

### and

▸ `Const`**and**(...`whens`: [*When*](README.md#when)[]): [*When*](README.md#when)

#### Parameters:

Name | Type |
:------ | :------ |
`...whens` | [*When*](README.md#when)[] |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/and.ts:3](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/and.ts#L3)

___

### consoleUserInterface

▸ `Const`**consoleUserInterface**(): [*IvrTesterPlugin*](interfaces/ivrtesterplugin.md)

**Returns:** [*IvrTesterPlugin*](interfaces/ivrtesterplugin.md)

Defined in: [testing/ui/consoleUserInterface.ts:138](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/ui/consoleUserInterface.ts#L138)

___

### contains

▸ `Const`**contains**(`text`: *string*, `__namedParameters?`: ContainsConfig): [*When*](README.md#when)

Evaluates whether a transcript contains a piece of text

```ts
contains('test')('this is a test transcript') // true
```

#### Parameters:

Name | Type |
:------ | :------ |
`text` | *string* |
`__namedParameters` | ContainsConfig |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/contains.ts:23](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/contains.ts#L23)

___

### containsSimilarTo

▸ `Const`**containsSimilarTo**(`similarText`: *string*, `similarityThreshold?`: *number*): [*When*](README.md#when)

Determines if there is a section of the transcript that is similar to a piece of text.

This is case-insensitive.

See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.

```ts
containsSimilarTo('this is the test'))('this is the best transcript') // true
```

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`similarText` | *string* | - | Text that is compared to the contents of the transcript for similarity   |
`similarityThreshold` | *number* | 0.8 | The degree of similarity is measured in a fraction between 0 and 1. 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.    |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/containsSimilarTo.ts:20](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/containsSimilarTo.ts#L20)

___

### doNothing

▸ `Const`**doNothing**(): [*Then*](interfaces/then.md)

**Returns:** [*Then*](interfaces/then.md)

Defined in: [testing/test/conditions/then/doNothing.ts:3](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/then/doNothing.ts#L3)

___

### hangUp

▸ `Const`**hangUp**(): [*Then*](interfaces/then.md)

**Returns:** [*Then*](interfaces/then.md)

Defined in: [testing/test/conditions/then/hangUp.ts:4](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/then/hangUp.ts#L4)

___

### hasPart

▸ `Const`**hasPart**(`when`: [*When*](README.md#when)): [*When*](README.md#when)

Splits the transcript into parts which are then passed to the argument When.

The transcript "press key 1" is split into the following parts, each of which are
passed to the argument.
  * press
  * press key
  * press key 1
  * key
  * key 1
  * 1

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`when` | [*When*](README.md#when) | Called with each of part of the transcript    |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/hasPart.ts:19](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/hasPart.ts#L19)

___

### isAnything

▸ `Const`**isAnything**(): [*When*](README.md#when)

Always evaluates as true

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/isAnything.ts:6](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/isAnything.ts#L6)

___

### matches

▸ `Const`**matches**(`pattern`: *RegExp*): [*When*](README.md#when)

#### Parameters:

Name | Type |
:------ | :------ |
`pattern` | *RegExp* |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/matches.ts:3](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/matches.ts#L3)

___

### or

▸ `Const`**or**(...`whens`: [*When*](README.md#when)[]): [*When*](README.md#when)

#### Parameters:

Name | Type |
:------ | :------ |
`...whens` | [*When*](README.md#when)[] |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/or.ts:3](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/or.ts#L3)

___

### press

▸ `Const`**press**(`dtmfSequence`: *string*): [*Then*](interfaces/then.md)

Sends DTMF tones to the call

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dtmfSequence` | *string* | Supported digits are 0123456789*# and w. w represents a pause of 0.5s.    |

**Returns:** [*Then*](interfaces/then.md)

Defined in: [testing/test/conditions/then/press.ts:9](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/then/press.ts#L9)

___

### similarTo

▸ `Const`**similarTo**(`similarText`: *string*, `similarityThreshold?`: *number*): [*When*](README.md#when)

Compares two strings to determine if they're similar.
See https://www.npmjs.com/package/string-similarity#api to read how similarity is calculated.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`similarText` | *string* | - | Text that is compared to the transcript for similarity   |
`similarityThreshold` | *number* | 0.8 | The degree of similarity is measured in a fraction between 0 and 1. 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.    |

**Returns:** [*When*](README.md#when)

Defined in: [testing/test/conditions/when/similarTo.ts:12](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/testing/test/conditions/when/similarTo.ts#L12)
