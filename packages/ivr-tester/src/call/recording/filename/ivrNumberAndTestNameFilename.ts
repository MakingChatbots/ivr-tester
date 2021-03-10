import filenamify from "filenamify";
import { FilenameFactory, StreamDetails } from "./FilenameFactory";
import { CallFlowTestDefinition } from "../../../testing/test/CallFlowTestDefinition";

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<test-name>-<optional-suffix>'
 */
export const ivrNumberAndTestNameFilename: FilenameFactory = (
  { call }: StreamDetails,
  test: CallFlowTestDefinition,
  suffix?: string
) =>
  filenamify(
    [`${Date.now()}`, call.to, test.name, suffix].filter((e) => e).join("-")
  );
