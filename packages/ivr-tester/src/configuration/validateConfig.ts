import { type ZodError, z } from 'zod';
import type { Caller } from '../call/Caller.js';
import { IvrTester } from '../IvrTester.js';
import type { Config } from './Config.js';
import type { IvrNumber } from './call/IvrNumber.js';

const schema = z.object({
  localServerPort: z.number().int().min(0).max(65535).default(8080),
  publicServerUrl: z.string().url().optional(),
  caller: z.custom<Caller<IvrNumber | Buffer>>((val) => val != null),
});

export const validateConfig = (config: Config): { config?: Config; error?: ZodError } => {
  const result = schema.safeParse(config);

  if (!result.success) {
    return { error: result.error };
  }

  const value = result.data as Config;
  if (value.publicServerUrl) {
    value.publicServerUrl = IvrTester.convertToWebSocketUrl(value.publicServerUrl).toString();
  }

  return { config: value };
};