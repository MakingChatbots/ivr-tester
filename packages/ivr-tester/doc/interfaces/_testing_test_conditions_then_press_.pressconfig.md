**[IVR Tester](../README.md)**

> [Globals](../README.md) / ["testing/test/conditions/then/press"](../modules/_testing_test_conditions_then_press_.md) / PressConfig

# Interface: PressConfig

## Hierarchy

* **PressConfig**

## Index

### Properties

* [disableAutomaticSlowdown](_testing_test_conditions_then_press_.pressconfig.md#disableautomaticslowdown)

## Properties

### disableAutomaticSlowdown

• `Optional` **disableAutomaticSlowdown**: boolean

*Defined in [packages/ivr-tester/src/testing/test/conditions/then/press.ts:13](https://github.com/SketchingDev/ivr-tester/blob/e182b43/packages/ivr-tester/src/testing/test/conditions/then/press.ts#L13)*

By default 'press' will automatically insert a
0.5 pause between keys (except where a pause already exists)
to increase the chance of the tone being picked up by the
IVR Flow.

This config key disables that behaviour.
