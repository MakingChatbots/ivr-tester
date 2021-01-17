import { URL } from "url";

export interface Caller<T> {
  call(call: T, streamUrl: URL | string): Promise<unknown>;
}
