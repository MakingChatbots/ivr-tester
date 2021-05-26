import { readFileSync } from "fs";

export type JsonFileReader = (path: string) => Record<string, unknown>;

export function createJsonFileReader(
  fsReadFileSync: typeof readFileSync
): JsonFileReader {
  return function (path: string): Record<string, unknown> {
    let content: Buffer;
    try {
      content = fsReadFileSync(path);
    } catch (error) {
      throw new Error(
        `Failed to read file '${path}'. Reason: ${error.message}`
      );
    }

    let jsonContent: Record<string, unknown>;
    try {
      jsonContent = JSON.parse(content.toString("utf-8"));
    } catch (error) {
      throw new Error(
        `File '${path}' not valid JSON. Reason: ${error.message}`
      );
    }

    return jsonContent;
  };
}
