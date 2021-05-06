import { Config, TranscriberFactory } from "ivr-tester";
import { validateConfig } from "./validateJsonConfig";
import { JsonConfigTranscriber } from "./JsonConfig";

function loadTranscriber(
  transcriber: JsonConfigTranscriber,
  moduleRequire: typeof require
): TranscriberFactory {
  const transcriberModuleName = `ivr-tester-transcriber-${transcriber.name}`;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const factory = moduleRequire(transcriberModuleName);
  if (typeof factory.default !== "function") {
    throw new Error(
      `Transcriber loaded does not have a default export '${transcriberModuleName}'. Contact the author of this package`
    );
  }

  return factory.default(transcriber.options);
}

export function configConverter(configuration: unknown): Config {
  const { error, config } = validateConfig(configuration);
  if (error) {
    throw new Error(error.message);
  }

  return {
    transcriber: loadTranscriber(config.transcriber),
    localServerPort: config.localServerPort,
    recording: config.recording,
  };
}
