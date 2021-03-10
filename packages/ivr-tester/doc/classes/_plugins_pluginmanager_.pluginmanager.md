**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["plugins/PluginManager"](../modules/_plugins_pluginmanager_.md) / PluginManager

# Class: PluginManager

## Hierarchy

* [TypedEmitter](_emitter_.typedemitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

  ↳ **PluginManager**

## Implements

* [Emitter](../interfaces/_emitter_.emitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

## Index

### Constructors

* [constructor](_plugins_pluginmanager_.pluginmanager.md#constructor)

### Properties

* [plugins](_plugins_pluginmanager_.pluginmanager.md#plugins)

### Methods

* [callRequestErrored](_plugins_pluginmanager_.pluginmanager.md#callrequesterrored)
* [callRequested](_plugins_pluginmanager_.pluginmanager.md#callrequested)
* [emit](_plugins_pluginmanager_.pluginmanager.md#emit)
* [initialise](_plugins_pluginmanager_.pluginmanager.md#initialise)
* [off](_plugins_pluginmanager_.pluginmanager.md#off)
* [on](_plugins_pluginmanager_.pluginmanager.md#on)
* [serverListening](_plugins_pluginmanager_.pluginmanager.md#serverlistening)

## Constructors

### constructor

\+ **new PluginManager**(`plugins`: [IvrTesterPlugin](../interfaces/_plugins_ivrtesterplugin_.ivrtesterplugin.md)[]): [PluginManager](_plugins_pluginmanager_.pluginmanager.md)

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:25](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`plugins` | [IvrTesterPlugin](../interfaces/_plugins_ivrtesterplugin_.ivrtesterplugin.md)[] |

**Returns:** [PluginManager](_plugins_pluginmanager_.pluginmanager.md)

## Properties

### plugins

• `Private` `Readonly` **plugins**: [IvrTesterPlugin](../interfaces/_plugins_ivrtesterplugin_.ivrtesterplugin.md)[]

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:26](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L26)*

## Methods

### callRequestErrored

▸ **callRequestErrored**(`error`: [Error](_configuration_configurationerror_.configurationerror.md#error)): void

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:47](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`error` | [Error](_configuration_configurationerror_.configurationerror.md#error) |

**Returns:** void

___

### callRequested

▸ **callRequested**(`requestedCall`: [RequestedCall](../modules/_call_caller_.md#requestedcall), `total`: number): void

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:40](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`requestedCall` | [RequestedCall](../modules/_call_caller_.md#requestedcall) |
`total` | number |

**Returns:** void

___

### emit

▸ **emit**\<K>(`eventName`: K, `params`: PluginEvents[K]): boolean

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[emit](_emitter_.typedemitter.md#emit)*

*Defined in [packages/ivr-tester/src/Emitter.ts:35](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`params` | PluginEvents[K] |

**Returns:** boolean

___

### initialise

▸ **initialise**(): void

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:30](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L30)*

**Returns:** void

___

### off

▸ **off**\<K>(`eventName`: K, `fn`: EventReceiver\<PluginEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[off](_emitter_.typedemitter.md#off)*

*Defined in [packages/ivr-tester/src/Emitter.ts:27](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L27)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<PluginEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

___

### on

▸ **on**\<K>(`eventName`: K, `fn`: EventReceiver\<PluginEvents[K]>): [TypedEmitter](_emitter_.typedemitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

*Implementation of [Emitter](../interfaces/_emitter_.emitter.md)*

*Inherited from [TypedEmitter](_emitter_.typedemitter.md).[on](_emitter_.typedemitter.md#on)*

*Defined in [packages/ivr-tester/src/Emitter.ts:19](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/Emitter.ts#L19)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | EventKey\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | K |
`fn` | EventReceiver\<PluginEvents[K]> |

**Returns:** [TypedEmitter](_emitter_.typedemitter.md)\<[PluginEvents](../modules/_plugins_pluginmanager_.md#pluginevents)>

___

### serverListening

▸ **serverListening**(`callServer`: [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md)): void

*Defined in [packages/ivr-tester/src/plugins/PluginManager.ts:36](https://github.com/SketchingDev/ivr-tester/blob/8e79354/packages/ivr-tester/src/plugins/PluginManager.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`callServer` | [CallServer](../interfaces/_testing_twiliocallserver_.callserver.md) |

**Returns:** void
