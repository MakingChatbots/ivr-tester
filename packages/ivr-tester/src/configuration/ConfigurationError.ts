export class ConfigurationError extends Error {
    constructor(private readonly propertyName: string, readonly reason: string) {
        super(`${propertyName} - ${reason}`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }

    getProperty() {
        return this.propertyName;
    }

    getReason() {
        return this.reason;
    }
}
