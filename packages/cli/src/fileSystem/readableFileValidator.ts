import fs, { accessSync } from "fs";
import commander from "commander";

export function readableFileValidator(fsAccessSync: typeof accessSync) {
  return function (filePath: string): string {
    try {
      fsAccessSync(filePath, fs.constants.R_OK);
    } catch (error) {
      throw new commander.InvalidOptionArgumentError(
        `File '${filePath}' is not readable`
      );
    }
    return filePath;
  };
}
