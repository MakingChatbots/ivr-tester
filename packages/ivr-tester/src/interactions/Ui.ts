/**
 * Exposed to interactions as a way to access the UI regardless of what
 * the UI is
 */
export interface Ui {
  reportProgressUpdate(message: string): void;
  reportError(errorMessage: string): void;
}
