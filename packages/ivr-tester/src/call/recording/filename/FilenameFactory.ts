import { StreamDetails } from "../MediaStreamRecorder";
import { CallFlowTest } from "../../../testing/test/CallFlowTest";

/**
 * Returns the filename used for recording a stream. The filename returned does not
 * need to contain the path nor extension.
 */
export type FilenameFactory = (
  stream: StreamDetails,
  test: CallFlowTest
) => string;
