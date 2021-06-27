[IVR Tester](../README.md) / PluginManager

# Class: PluginManager

## Hierarchy

* [*TypedEmitter*](typedemitter.md)<PluginEvents\>

  ↳ **PluginManager**

## Implements

* *PluginHost*

## Table of contents

### Constructors

- [constructor](pluginmanager.md#constructor)

### Properties

- [testRunner](pluginmanager.md#testrunner)

### Methods

- [abortTests](pluginmanager.md#aborttests)
- [callRequestErrored](pluginmanager.md#callrequesterrored)
- [callRequested](pluginmanager.md#callrequested)
- [emit](pluginmanager.md#emit)
- [initialise](pluginmanager.md#initialise)
- [off](pluginmanager.md#off)
- [on](pluginmanager.md#on)
- [serverListening](pluginmanager.md#serverlistening)

## Constructors

### constructor

\+ **new PluginManager**(`plugins`: [*IvrTesterPlugin*](../interfaces/ivrtesterplugin.md)[]): [*PluginManager*](pluginmanager.md)

#### Parameters:

Name | Type |
:------ | :------ |
`plugins` | [*IvrTesterPlugin*](../interfaces/ivrtesterplugin.md)[] |

**Returns:** [*PluginManager*](pluginmanager.md)

Inherited from: [TypedEmitter](typedemitter.md)

Defined in: [plugins/PluginManager.ts:41](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L41)

## Properties

### testRunner

• `Private` **testRunner**: [*TestRunner*](../interfaces/testrunner.md)

Defined in: [plugins/PluginManager.ts:41](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L41)

## Methods

### abortTests

▸ **abortTests**(`reason`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`reason` | *string* |

**Returns:** *void*

Defined in: [plugins/PluginManager.ts:54](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L54)

___

### callRequestErrored

▸ **callRequestErrored**(`error`: Error): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error |

**Returns:** *void*

Defined in: [plugins/PluginManager.ts:78](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L78)

___

### callRequested

▸ **callRequested**(`requestedCall`: RequestedCall, `total`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`requestedCall` | RequestedCall |
`total` | *number* |

**Returns:** *void*

Defined in: [plugins/PluginManager.ts:71](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L71)

___

### emit

▸ **emit**<K\>(`eventName`: K, `params`: PluginEvents[K]): *boolean*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *EventKey*<PluginEvents\> |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`params` | PluginEvents[K] |

**Returns:** *boolean*

Inherited from: [TypedEmitter](typedemitter.md)

Defined in: [Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L35)

___

### initialise

▸ **initialise**(`testRunner`: [*TestRunner*](../interfaces/testrunner.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`testRunner` | [*TestRunner*](../interfaces/testrunner.md) |

**Returns:** *void*

Defined in: [plugins/PluginManager.ts:47](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L47)

___

### off

▸ **off**<K\>(`eventName`: K, `fn`: *EventReceiver*<PluginEvents[K]\>): [*TypedEmitter*](typedemitter.md)<PluginEvents\>

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *EventKey*<PluginEvents\> |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<PluginEvents[K]\> |

**Returns:** [*TypedEmitter*](typedemitter.md)<PluginEvents\>

Inherited from: [TypedEmitter](typedemitter.md)

Defined in: [Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L27)

___

### on

▸ **on**<K\>(`eventName`: K, `fn`: *EventReceiver*<PluginEvents[K]\>): [*TypedEmitter*](typedemitter.md)<PluginEvents\>

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *EventKey*<PluginEvents\> |

#### Parameters:

Name | Type |
:------ | :------ |
`eventName` | K |
`fn` | *EventReceiver*<PluginEvents[K]\> |

**Returns:** [*TypedEmitter*](typedemitter.md)<PluginEvents\>

Inherited from: [TypedEmitter](typedemitter.md)

Defined in: [Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/Emitter.ts#L19)

___

### serverListening

▸ **serverListening**(`callServer`: *CallServer*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callServer` | *CallServer* |

**Returns:** *void*

Defined in: [plugins/PluginManager.ts:59](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/ivr-tester/src/plugins/PluginManager.ts#L59)
