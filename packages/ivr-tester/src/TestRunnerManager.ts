// import { ReadonlyIvrTesterLifecycle } from "./IvrTester";
//
// type OnStopCallback = (failure: boolean) => void;
// export interface TestRunnerManager {
//   setOnStopCallback: (cb: OnStopCallback) => void;
//   testRunner: IvrTesterController;
// }
//
// export function createIvrTesterExecution(
//   ivrTesterLifecycle: ReadonlyIvrTesterLifecycle
// ): TestRunnerManager {
//   let callback: OnStopCallback = undefined;
//   let stopped = false;
//   let stoppedDueToFailure = false;
//
//   return {
//     setOnStopCallback(cb: OnStopCallback) {
//       callback = cb;
//       if (stopped) {
//         callback(stoppedDueToFailure);
//       }
//     },
//     testRunner: {
//       stop(failure = false) {
//         stopped = true;
//         stoppedDueToFailure = failure;
//
//         if (callback) {
//           callback(stoppedDueToFailure);
//         }
//       },
//     },
//   };
// }
