import { Then } from "./Then";

export const doNothing = (): Then => ({
  do: () => {
    // Intentionally empty
  },
  describe: () => "do nothing",
});
