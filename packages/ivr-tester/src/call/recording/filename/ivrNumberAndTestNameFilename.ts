import { FilenameFactory, StreamDetails } from "./FilenameFactory";
import { TestScenario } from "../../../testing/scenario/TestScenario";

export function sanitise(text: string): string {
  return `${text}`
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9\-_]/gi, "");
}

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<test-name>-<optional-suffix>'
 */
export const ivrNumberAndTestNameFilename: FilenameFactory = (
  { call }: StreamDetails,
  test: TestScenario,
  suffix?: string
) =>
  sanitise(
    [`${Date.now()}`, call.to, test.name, suffix].filter((e) => e).join("-")
  );
