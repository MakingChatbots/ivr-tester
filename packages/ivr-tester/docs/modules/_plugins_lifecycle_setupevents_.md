**[IVR Tester](../README.md)**

> [Globals](../README.md) / "plugins/lifecycle/SetupEvents"

# Module: "plugins/lifecycle/SetupEvents"

## Index

### Interfaces

* [CallHandlingServerErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingservererroredevent.md)
* [CallHandlingServerStartedEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingserverstartedevent.md)
* [CallRequestErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequesterroredevent.md)
* [CallRequestedEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequestedevent.md)

### Type aliases

* [SetupEvents](_plugins_lifecycle_setupevents_.md#setupevents)

## Type aliases

### SetupEvents

Ƭ  **SetupEvents**: { callHandlingServerErrored: [CallHandlingServerErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingservererroredevent.md) ; callHandlingServerStarted: [CallHandlingServerStartedEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingserverstartedevent.md) ; callHandlingServerStopped: undefined ; callRequestErrored: [CallRequestErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequesterroredevent.md) ; callRequested: [CallRequestedEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequestedevent.md)  }

*Defined in [packages/ivr-tester/src/plugins/lifecycle/SetupEvents.ts:26](https://github.com/SketchingDev/ivr-tester/blob/a93dd5f/packages/ivr-tester/src/plugins/lifecycle/SetupEvents.ts#L26)*

Lifecycle events of setting up a test

#### Type declaration:

Name | Type |
------ | ------ |
`callHandlingServerErrored` | [CallHandlingServerErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingservererroredevent.md) |
`callHandlingServerStarted` | [CallHandlingServerStartedEvent](../interfaces/_plugins_lifecycle_setupevents_.callhandlingserverstartedevent.md) |
`callHandlingServerStopped` | undefined |
`callRequestErrored` | [CallRequestErroredEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequesterroredevent.md) |
`callRequested` | [CallRequestedEvent](../interfaces/_plugins_lifecycle_setupevents_.callrequestedevent.md) |
