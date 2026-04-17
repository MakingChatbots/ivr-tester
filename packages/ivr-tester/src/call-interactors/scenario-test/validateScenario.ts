import { type ZodError, z } from 'zod';
import type { Scenario } from './scenario-definition/Scenario.js';
import type { Then } from './scenario-definition/then/index.js';

const schema = z.object({
  name: z.string(),
  steps: z.array(
    z.object({
      whenPrompt: z.function(),
      then: z.custom<Then>((val) => val != null),
      silenceAfterPrompt: z.number(),
      timeout: z.number(),
    }),
  ),
});

export const validateScenario = (scenario: Scenario): { scenario?: Scenario; error?: ZodError } => {
  const result = schema.safeParse(scenario);

  if (!result.success) {
    return { error: result.error };
  }

  return { scenario: result.data as Scenario };
};
