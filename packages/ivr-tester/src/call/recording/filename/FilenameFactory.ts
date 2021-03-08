import { StreamDetails } from "../MediaStreamRecorder";
import { CallFlowTestDefinition } from "../../../testing/test/CallFlowTestDefinition";

/**
 * Returns the filename used for recording a stream. The filename returned does not
 * need to contain the path nor extension.
 */
export type FilenameFactory = (
  stream: StreamDetails,
  callFlowTestDefinition: CallFlowTestDefinition
) => string;
