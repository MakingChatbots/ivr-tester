import { FilenameFactory, StreamDetails } from "./FilenameFactory";

export function sanitise(text: string): string {
  return `${text}`
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9\-_]/gi, "");
}

/**
 * Produces filename that looks like '<datetime>-<phone-number>-<optional-suffix>'
 */
export const dateAndPhoneNumberFilename: FilenameFactory = (
  { call }: StreamDetails,
  suffix?: string
) => sanitise([`${Date.now()}`, call.to, suffix].filter((e) => e).join("-"));
