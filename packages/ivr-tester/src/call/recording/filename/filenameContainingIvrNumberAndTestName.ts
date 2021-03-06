import filenamify from "filenamify";
import { FilenameFactory } from "./FilenameFactory";
import { StreamDetails } from "../MediaStreamRecorder";
import { CallFlowTest } from "../../../testing/test/CallFlowTest";

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<test-name>.wav'
 */
export const filenameContainingIvrNumberAndTestName: FilenameFactory = (
  { call }: StreamDetails,
  test: CallFlowTest
) => filenamify(`${Date.now()}-${call.to}-${test.name}`);
