import filenamify from "filenamify";
import { FilenameFactory } from "./FilenameFactory";
import { StreamDetails } from "../MediaStreamRecorder";
import { CallFlowTestDefinition } from "../../../testing/test/CallFlowTestDefinition";

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<test-name>.wav'
 */
export const filenameContainingIvrNumberAndTestName: FilenameFactory = (
  { call }: StreamDetails,
  test: CallFlowTestDefinition
) => filenamify(`${Date.now()}-${call.to}-${test.name}`);
