import { When } from "./When";

export interface containsConfig {
  ignoreCasing: boolean;
}

/** @category When */
export const contains = (
  partial: string,
  config: containsConfig = { ignoreCasing: true }
): When => (transcript: string) => {
  return config.ignoreCasing
    ? transcript.toLowerCase().includes(partial.toLowerCase())
    : transcript.includes(partial);
};
