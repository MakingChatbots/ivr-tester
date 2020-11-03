import { Call } from "../../handlers/inOrder";
import { Then } from "./Then";

export const press = (dtmfSequence: string): Then => ({
  do: (call: Call) => call.sendDtmfTone(dtmfSequence),
  describe: () => `press key(s) ${dtmfSequence}`,
});
