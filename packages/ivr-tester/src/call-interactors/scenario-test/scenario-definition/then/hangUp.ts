import { Then } from "./Then";
import { Call } from "../../../../call/Call";

export const hangUp = (): Then => ({
  do: (call: Call) => call.close("Then directive"),
  describe: () => "hang-up",
});
