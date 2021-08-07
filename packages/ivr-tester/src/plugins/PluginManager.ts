// import { IvrTesterPlugin } from "./IvrTesterPlugin";
// import { CallServer } from "../TwilioCallServer";
// import { Emitter, TypedEmitter } from "../Emitter";
// import { RequestedCall } from "../call/Caller";
// import { IvrTester, IvrTesterLifecycleEvents } from "../IvrTester";
// import { IvrTesterController } from "../TestRunnerManager";
//
// // /**
// //  * Interface exposed to plugins to allow them to listen to events and abort testing.
// //  */
// // export type ReadonlyIvrTesterLifecycle = Omit<
// //   Emitter<IvrTesterLifecycleEvents>,
// //   "emit"
// // >;
//
// export class PluginManager {
//   private readonly ivrTesterLifecycle: Emitter<IvrTesterLifecycleEvents>;
//
//   private ivrTesterController: IvrTesterController;
//
//   constructor(private readonly plugins: IvrTesterPlugin[]) {
//     this.ivrTesterLifecycle = new TypedEmitter<IvrTesterLifecycleEvents>();
//   }
//
//   public initialise(ivrTesterController: IvrTesterController): void {
//     this.ivrTesterController = ivrTesterController;
//     for (const plugin of this.plugins) {
//       plugin.initialise(this, ivrTesterController);
//     }
//   }
//
//   public abortTests(reason: string): void {
//     this.ivrTesterController.stop(true, reason);
//   }
//
//   public serverListening(callServer: CallServer): void {
//     this.emit("callServerStarted", { callServer });
//
//     callServer.on("testStarted", (event) => {
//       for (const plugin of this.plugins) {
//         if (typeof plugin.testStarted === "function") {
//           plugin.testStarted(event.testSession);
//         }
//       }
//     });
//   }
//
//   public callRequested(requestedCall: RequestedCall, total: number): void {
//     this.emit("callRequested", {
//       requestedCall,
//       total,
//     });
//   }
//
//   public callRequestErrored(error: Error): void {
//     this.emit("callRequestErrored", { error });
//   }
// }
