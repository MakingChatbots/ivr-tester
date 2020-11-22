export type When = (transcript: string) => boolean;
export type WhenFactory<T> = (config:T) => When;
