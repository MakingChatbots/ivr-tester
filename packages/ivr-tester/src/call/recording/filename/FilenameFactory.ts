import { CallFlowTestDefinition } from "../../../testing/test/CallFlowTestDefinition";

/**
 * Details about the stream about to be recorded
 */
export interface StreamDetails {
  sid: string;
  call: { from: string; to: string };
}

/**
 * Returns the filename used for recording a stream. The filename returned does not
 * need to contain the path nor extension.
 */
export type FilenameFactory = (
  stream: StreamDetails,
  callFlowTestDefinition: CallFlowTestDefinition,
  customSuffix?: string
) => string;
