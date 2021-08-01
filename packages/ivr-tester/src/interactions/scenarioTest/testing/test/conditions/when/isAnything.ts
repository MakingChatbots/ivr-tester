import { When } from "./When";

/**
 * Always evaluates as true
 */
export const isAnything = (): When => () => true;
