import { IvrTest } from "../../../handlers/TestHandler";
import { StreamDetails } from "../MediaStreamRecorder";

/**
 * Returns the filename used for recording a stream. The filename returned does not
 * need to contain the path nor extension.
 */
export type FilenameFactory = (stream: StreamDetails, test: IvrTest) => string;
