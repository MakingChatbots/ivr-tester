// TODO Uncomment and update
test("pending", () => {
  expect(true).toBe(true);
});

// import { CloseServerWhenTestsComplete } from "./CloseServerWhenTestsComplete";
// import { PluginEvents } from "../plugins/PluginManager";
// import { Emitter, TypedEmitter } from "../Emitter";
// import {
//   TwilioCallServer,
//   CallServer,
//   CallServerEvents,
// } from "./TwilioCallServer";
// import { Call } from "../call/Call";
// import { CallFlowTestDefinition } from "./test/CallFlowTestDefinition";
// import { URL } from "url";
//
// class StubCallServer
//   extends TypedEmitter<CallServerEvents>
//   implements CallServer {
//   listen(): Promise<URL> {
//     return Promise.resolve(undefined);
//   }
//
//   stop(): void {
//     // Intentionally empty
//   }
//
//   // getEstablishedCalls(): ReadonlyArray<Call> {
//   //   return undefined;
//   // }
//   //
//   // preventNewCalls(): void {
//   // }
// }
// // export class AbcTwilioCallServer
// //   extends TypedEmitter<CallServerEvents>
// //   implements CallServer {}
//
// // class StubTestInstance
// //   extends TypedEmitter<TestInstanceEvents>
// //   implements TestInstance {
// //   getCall(): Call {
// //     throw new Error("Not Implemented");
// //   }
// //
// //   getTest(): CallFlowTestDefinition {
// //     throw new Error("Not Implemented");
// //   }
// // }
//
// describe("Close server when tests complete", () => {
//   let pluginEmitter: Emitter<PluginEvents>;
//   let callServer: CallServer;
//
//   beforeEach(() => {
//     pluginEmitter = new TypedEmitter<PluginEvents>();
//     callServer = new StubCallServer();
//   });
//
//   test("closes server when all tests succeed", () => {
//     const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
//     stopWhenAllTestsComplete.initialise(pluginEmitter);
//
//     pluginEmitter.emit("callServerStarted", {
//       callServer: (callServer as unknown) as TwilioCallServer,
//     });
//
//     // const testInstance = new AbcTwilioCallServer();
//     callServer.emit("testStarted", {
//       testSession: {
//         call: undefined,
//         callFlowSession: undefined,
//         callFlowTestDefinition: undefined,
//       },
//     });
//
//     jest.spyOn(callServer, "stop");
//     testInstance.emit("testPassed", { test: undefined });
//
//     expect(callServer.stop).toHaveBeenCalled();
//   });
//
//   test("closes server when all tests fail", () => {
//     const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
//     stopWhenAllTestsComplete.initialise(pluginEmitter);
//
//     pluginEmitter.emit("callServerStarted", {
//       callServer: (callServer as unknown) as TwilioCallServer,
//     });
//
//     const testInstance = new StubTestInstance();
//     callServer.emit("testStarted", { testSession: testInstance });
//
//     jest.spyOn(callServer, "stop");
//     testInstance.emit("testFailed", {
//       test: undefined,
//       transcription: undefined,
//     });
//
//     expect(callServer.stop).toHaveBeenCalled();
//   });
//
//   test("server not closed if all tests are not complete", () => {
//     const stopWhenAllTestsComplete = new CloseServerWhenTestsComplete();
//     stopWhenAllTestsComplete.initialise(pluginEmitter);
//
//     pluginEmitter.emit("callServerStarted", {
//       callServer: (callServer as unknown) as TwilioCallServer,
//     });
//
//     const testInstance1 = new StubTestInstance();
//     const testInstance2 = new StubTestInstance();
//     callServer.emit("testStarted", { testSession: testInstance1 });
//     callServer.emit("testStarted", { testSession: testInstance2 });
//
//     jest.spyOn(callServer, "stop");
//     testInstance1.emit("testPassed", { test: undefined });
//
//     expect(callServer.stop).not.toHaveBeenCalled();
//   });
// });
