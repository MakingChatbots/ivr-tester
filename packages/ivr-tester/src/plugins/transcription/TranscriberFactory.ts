import { TranscriberPlugin } from "./TranscriberPlugin";

/**
 * Factory to create a instance of a transcriber per test
 */
export type TranscriberFactory = () => TranscriberPlugin;
