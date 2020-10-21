import path from "path";
import { readFileSync } from "fs";
import { DtmfBufferGenerator } from "./DtmfPlayer";

/**
 * Generates stream of DTMF encoded in an 8 bit PCM encoding (MULAW) at 8000 Hertz
 */
export class UlawDtmfBufferGenerator implements DtmfBufferGenerator {
  private static readonly VALID_DTMF_DIGITS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "#",
    "w",
  ];
  private static readonly DIGIT_SEPARATOR = "";
  private static readonly DEFAULT_RAW_BASE_PATH = path.join(
    __dirname,
    "./raw/"
  );

  private readonly paths = new Map<string, string>();
  private readonly rawCache = new Map<string, Buffer>();

  constructor(
    rawFilesBasePath: string = UlawDtmfBufferGenerator.DEFAULT_RAW_BASE_PATH
  ) {
    this.initiatePathsToRawFiles(rawFilesBasePath);
  }

  private initiatePathsToRawFiles(basePath: string) {
    this.paths.set("0", path.join(basePath, "0.raw"));
    this.paths.set("1", path.join(basePath, "1.raw"));
    this.paths.set("2", path.join(basePath, "2.raw"));
    this.paths.set("3", path.join(basePath, "3.raw"));
    this.paths.set("4", path.join(basePath, "4.raw"));
    this.paths.set("5", path.join(basePath, "5.raw"));
    this.paths.set("6", path.join(basePath, "6.raw"));
    this.paths.set("7", path.join(basePath, "7.raw"));
    this.paths.set("8", path.join(basePath, "8.raw"));
    this.paths.set("9", path.join(basePath, "9.raw"));
    this.paths.set("*", path.join(basePath, "asterisk.raw"));
    this.paths.set("#", path.join(basePath, "hash.raw"));
    this.paths.set("w", path.join(basePath, "w.raw"));
  }

  public generate(digits: string): Buffer {
    if (typeof digits !== "string" || digits.length === 0) {
      throw new Error("At least one digit must be provided");
    }
    digits = digits.toLocaleLowerCase();

    const separateDigits = digits.split(
      UlawDtmfBufferGenerator.DIGIT_SEPARATOR
    );
    UlawDtmfBufferGenerator.validateDigits(separateDigits);

    return Buffer.concat(separateDigits.map((d) => this.getRawBuffer(d)));
  }

  private getRawBuffer(digit: string): Buffer {
    if (this.rawCache.has(digit)) {
      return this.rawCache.get(digit);
    }

    const file = readFileSync(this.paths.get(digit));
    this.rawCache.set(digit, file);

    return file;
  }

  private static validateDigits(digits: string[]) {
    for (const digit of digits) {
      if (!UlawDtmfBufferGenerator.VALID_DTMF_DIGITS.some((d) => d === digit)) {
        throw new Error(
          `${digit} is not a valid DTMF digit. It must be any of the following: ${UlawDtmfBufferGenerator.VALID_DTMF_DIGITS}`
        );
      }
    }
  }
}
