import { FilenameFactory, StreamDetails } from "./FilenameFactory";
import { Scenario } from "../../../configuration/scenario/Scenario";

export function sanitise(text: string): string {
  return `${text}`
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9\-_]/gi, "");
}

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<scenario-name>-<optional-suffix>'
 */
export const ivrNumberAndTestNameFilename: FilenameFactory = (
  { call }: StreamDetails,
  scenario: Scenario,
  suffix?: string
) =>
  sanitise(
    [`${Date.now()}`, call.to, scenario.name, suffix].filter((e) => e).join("-")
  );
