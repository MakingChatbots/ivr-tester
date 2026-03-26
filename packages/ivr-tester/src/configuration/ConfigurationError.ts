export class ConfigurationError extends Error {
  constructor(
    private readonly propertyName: string,
    private readonly reason: string
  ) {
    super(`${propertyName} - ${reason}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }

  public getProperty(): string {
    return this.propertyName;
  }

  public getReason(): string {
    return this.reason;
  }
}
