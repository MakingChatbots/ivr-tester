export class ArgumentUndefinedError extends TypeError {
  constructor(argumentName: string) {
    super(`'${argumentName}' argument must be defined`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArgumentUndefinedError.prototype);
  }
}
