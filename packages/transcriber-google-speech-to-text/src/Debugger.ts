import debug from "debug";

export class Debugger {
  private static packageName = "ivr-tester-transcriber-google-speech-to-text";

  public static getPackageDebugger(): debug.Debugger {
    return debug(Debugger.packageName);
  }

  public static enable(): void {
    debug.enable(Debugger.packageName);
  }
}
