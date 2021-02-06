import { Then } from "./Then";

export const doNothing = (): Then => ({
  do: () => Promise.resolve(),
  describe: () => "do nothing",
});
