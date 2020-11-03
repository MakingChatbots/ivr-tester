import { Then } from "./Then";

export const doNothing = (): Then => ({
  do: () => {},
  describe: () => "do nothing",
});
