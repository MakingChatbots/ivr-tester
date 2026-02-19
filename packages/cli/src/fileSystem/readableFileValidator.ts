import fs, { type accessSync } from "node:fs";
import commander from "commander";

export function readableFileValidator(fsAccessSync: typeof accessSync) {
  return (filePath: string): string => {
    try {
      fsAccessSync(filePath, fs.constants.R_OK);
    } catch (_error) {
      throw new commander.InvalidOptionArgumentError(
        `File '${filePath}' is not readable`,
      );
    }
    return filePath;
  };
}
