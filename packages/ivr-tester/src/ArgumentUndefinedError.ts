export class ArgumentUndefinedError extends TypeError {
  public constructor(argumentName: string) {
    super(`'${argumentName}' argument must be defined`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArgumentUndefinedError.prototype);
  }
}
