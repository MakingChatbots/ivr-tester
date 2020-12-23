import debug from "debug";

export class Debugger {
  private static packageName = "ivr-tester";

  private static getDebugger(feature: string): debug.Debugger {
    return debug(`${Debugger.packageName}:${feature}`);
  }

  public static getPackageDebugger(): debug.Debugger {
    return debug(Debugger.packageName);
  }

  public static getTwilioDebugger(): debug.Debugger {
    return Debugger.getDebugger("twilio");
  }
}
