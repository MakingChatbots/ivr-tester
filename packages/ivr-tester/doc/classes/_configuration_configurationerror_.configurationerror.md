**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["configuration/ConfigurationError"](../modules/_configuration_configurationerror_.md) / ConfigurationError

# Class: ConfigurationError

## Hierarchy

* [Error](_configuration_configurationerror_.configurationerror.md#error)

  ↳ **ConfigurationError**

## Index

### Constructors

* [constructor](_configuration_configurationerror_.configurationerror.md#constructor)

### Properties

* [message](_configuration_configurationerror_.configurationerror.md#message)
* [name](_configuration_configurationerror_.configurationerror.md#name)
* [propertyName](_configuration_configurationerror_.configurationerror.md#propertyname)
* [reason](_configuration_configurationerror_.configurationerror.md#reason)
* [stack](_configuration_configurationerror_.configurationerror.md#stack)
* [Error](_configuration_configurationerror_.configurationerror.md#error)

### Methods

* [getProperty](_configuration_configurationerror_.configurationerror.md#getproperty)
* [getReason](_configuration_configurationerror_.configurationerror.md#getreason)

## Constructors

### constructor

\+ **new ConfigurationError**(`propertyName`: string, `reason`: string): [ConfigurationError](_configuration_configurationerror_.configurationerror.md)

*Defined in [packages/ivr-tester/src/configuration/ConfigurationError.ts:1](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/ConfigurationError.ts#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |
`reason` | string |

**Returns:** [ConfigurationError](_configuration_configurationerror_.configurationerror.md)

## Properties

### message

•  **message**: string

*Inherited from [ConfigurationError](_configuration_configurationerror_.configurationerror.md).[message](_configuration_configurationerror_.configurationerror.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string

*Inherited from [ConfigurationError](_configuration_configurationerror_.configurationerror.md).[name](_configuration_configurationerror_.configurationerror.md#name)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:973*

___

### propertyName

• `Private` `Readonly` **propertyName**: string

*Defined in [packages/ivr-tester/src/configuration/ConfigurationError.ts:2](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/ConfigurationError.ts#L2)*

___

### reason

• `Readonly` **reason**: string

*Defined in [packages/ivr-tester/src/configuration/ConfigurationError.ts:2](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/ConfigurationError.ts#L2)*

___

### stack

• `Optional` **stack**: string

*Inherited from [ConfigurationError](_configuration_configurationerror_.configurationerror.md).[stack](_configuration_configurationerror_.configurationerror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:984*

## Methods

### getProperty

▸ **getProperty**(): string

*Defined in [packages/ivr-tester/src/configuration/ConfigurationError.ts:9](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/ConfigurationError.ts#L9)*

**Returns:** string

___

### getReason

▸ **getReason**(): string

*Defined in [packages/ivr-tester/src/configuration/ConfigurationError.ts:13](https://github.com/SketchingDev/ivr-tester/blob/cff7065/packages/ivr-tester/src/configuration/ConfigurationError.ts#L13)*

**Returns:** string
