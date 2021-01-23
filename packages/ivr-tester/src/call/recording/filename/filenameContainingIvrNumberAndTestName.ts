import filenamify from "filenamify";
import { FilenameFactory } from "./FilenameFactory";
import { StreamDetails } from "../MediaStreamRecorder";
import { IvrTest } from "../../../testing/test/IvrTest";

/**
 * Produces filename that looks like '<phone-number>-<datetime>-<test-name>.wav'
 */
export const filenameContainingIvrNumberAndTestName: FilenameFactory = (
  { call }: StreamDetails,
  test: IvrTest
) => filenamify(`${Date.now()}-${call.to}-${test.name}`);
